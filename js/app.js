/* Story progression and puzzle rules. Room content itself is in game-data.js. */
(()=>{
 const D=GameData,S=GameState,U=GameUI,$=U.$,rooms=D.rooms,items=D.items;let action="look",selectedItem=null;
 const roomStatus={reception:"The office has been waiting for someone.",kitchen:"A recipe, a scale, and a suspiciously well-stocked cupboard.",bedroom:"The reflection seems a little more awake than the room.",observatory:"The stars have been arranged by someone who knows you.",engine:"The heart of the building is waiting for a human answer."};
 function render(){
  const s=S.get(),r=rooms[s.room];$("room-title").textContent=r.title;$("room-num").textContent=String(D.roomOrder.indexOf(s.room)+1).padStart(2,"0");$("caption").textContent=r.caption;$("mood").textContent=r.mood;$("status").textContent=roomStatus[s.room];
  const scene=$("scene");scene.className="scene "+s.room;const art=$("scene-art"),roomImage=new Image();art.style.backgroundImage="url('"+r.background+"')";roomImage.onerror=()=>{if(S.get().room===s.room)art.style.backgroundImage=""};roomImage.src=r.background;
  const box=$("hotspots");box.replaceChildren();r.hotspots.forEach(h=>{const b=document.createElement("button");b.className="hotspot"+(s.completed.includes(h.id)?" done":"");b.style.left=h.x+"%";b.style.top=h.y+"%";b.setAttribute("aria-label",h.name);b.innerHTML=h.icon+"<span>"+h.name+"</span>";b.onclick=()=>interact(h);box.append(b)});
  U.render(s,D);$("sound").textContent="Sound: "+(s.sound?"on":"off")
 }
 function travel(room){const scene=$("scene");scene.style.opacity=".1";setTimeout(()=>{S.get().room=room;scene.style.opacity="";S.save();render()},240)}
 function interact(h){
  const s=S.get();GameAudio.effect("click");if(action==="use"&&selectedItem){useOn(h);return}if(h.goTo){const needed={"kitchen":"key-i","bedroom":"key-ii","observatory":"key-iii","engine":"key-iv"}[h.goTo];if(needed&&!S.has(needed)){U.say("The key is missing","This door needs "+items[needed].name+". Find it before going farther.");return}if(h.goTo==="engine"&&!s.completed.includes("rings")){U.say("The stair is sealed","Align the heart constellation before descending.");return}travel(h.goTo);return}
  if(h.symbol){mirrorStep(h);return}if(h.note)S.addNote(h.note);if(h.item){S.addItem(h.item);U.toast("Added "+items[h.item].name+" to inventory.")}if(h.puzzle){puzzle(h.puzzle);return}U.say(h.name,h.description);S.save();render()
 }
 function useOn(h){
  const routes={"key-i":"door-kitchen","key-ii":"door-bedroom","key-iii":"door-observatory","key-iv":"door-engine"};
  if(routes[selectedItem]===h.id){selectedItem=null;action="look";$("selection").textContent="Choose something to inspect";document.querySelectorAll(".action").forEach(b=>b.classList.toggle("active",b.dataset.action==="look"));if(h.goTo){if(h.goTo==="engine"&&!S.get().completed.includes("rings")){U.say("The stair is sealed","The key turns, but the constellation must be aligned first.");return}travel(h.goTo)}return}
  U.say("That doesn't fit",items[selectedItem].name+" doesn't seem useful with "+h.name.toLowerCase()+".")
 }
 window.onInventoryItem=id=>{if(action==="use"){selectedItem=id;$("selection").textContent="Using "+items[id].name+" · choose a target"}else U.say(items[id].name,items[id].description,"INVENTORY")};
 function reward(key){if(!S.has(key)){S.addItem(key);U.toast(items[key].name+" added to inventory.")}S.save()}
 function puzzle(which){
  const s=S.get();
  if(which==="phone"){U.puzzle("The last appointment",'<p>The clock stopped at <b>11:42</b>. The register says the extension mirrors the hour. Enter four digits.</p>','<input class="input" id="answer" inputmode="numeric" maxlength="4" placeholder="0000">',()=>{
   if($("answer").value.trim()!=="1142"){$("feedback").textContent="No answer. Check the clock and the register.";return}
   GameAudio.effect("solved");GameAudio.effect("telephone");S.complete("phone");S.addNote("The caller said: “Keys open the rooms. Attention opens the rest.”");U.close("puzzle");U.say("A familiar voice","“Ah. Finally. I was beginning to think you'd forgotten about me.”\n\n“Don't hang up. I'm technically a professional.”\n\nA click. The desk drawer unlocks with a soft clunk.","TELEPHONE",[{label:"Open the drawer",onClick:drawer},{label:"Close"}]);S.save()
  });return}
  if(which==="drawer"){if(!s.completed.includes("phone")){U.say("A locked drawer","The desk drawer has a keyhole and a brass plate marked KEY I. The telephone is the only thing here that still seems to listen.");return}drawer();return}
  if(which==="fridge"){if(s.completed.includes("fridge")){U.say("The refrigerator","The dessert is gone. The note remains: DO NOT LET THE RECEPTIONIST EAT THE ENTIRE THING AGAIN.");return}
   U.puzzle("Cupid's emergency recipe",'<p>Strawberry cake recipe: flour 60 g, sugar 30 g, strawberries 40 g, butter 20 g.<br>The scale adds 10 g. Fill in the refrigerator note, then enter the tens digits in its order:</p><blockquote class="recipe-note">STRAWBERRIES — ____ g<br>BUTTER — ____ g<br>FLOUR — ____ g<br>SUGAR — ____ g</blockquote><p class="hint">The note is deliberately not in recipe order.</p>','<input class="input" id="answer" inputmode="numeric" maxlength="4" placeholder="0000">',()=>{
    if($("answer").value.trim()!=="5374"){$("feedback").textContent="Use the fridge note's order. Add 10 g to each recipe amount, then take the tens digit.";return}
    GameAudio.effect("solved");S.complete("fridge");reward("key-ii");S.addNote("Fridge-note order: strawberries 50 g, butter 30 g, flour 70 g, sugar 40 g. Code: 5374.");U.close("puzzle");U.say("Emergency happiness protocol","The refrigerator opens. Inside: a strawberry cake, Key II, and a note blaming the receptionist personally.");render()
   });return}
  if(which==="cabinet"){if(!s.ringsAligned){U.say("Still locked","The cabinet opens after the rings form the heart constellation.");return}S.complete("cabinet");reward("key-iv");U.say("The cabinet opens","Key IV rests beside the heart-constellation chart. The fifth star has been left blank.");render();return}
  if(which==="rings"){if(s.ringsAligned){U.say("The aligned rings","The rings hold their shape. A small heart glows between them.");return}
   U.puzzle("Align the heart constellation",'<p>Solve the star chart riddle, then enter the ring moves in order.<br><b>R</b> = right, <b>L</b> = left, <b>U</b> = up, <b>D</b> = down.</p>','<input class="input" id="answer" maxlength="4" autocapitalize="characters" placeholder="Four letters, no spaces">',()=>{
    if($("answer").value.replace(/\s/g,"").toUpperCase()!=="RLUD"){$("feedback").textContent="Read the stars' journey: east, west, rise, then sink.";return}
    GameAudio.effect("solved");s.ringsAligned=true;S.complete("rings");S.addNote("The observatory ring moves are R–L–U–D: right, left, up, down. The fifth star remains outside the heart.");U.close("puzzle");U.say("A heart among the stars","The rings turn into place. Four points of light form a broken heart; the fifth star keeps its distance.");S.save();render()
   });return}
  if(which==="engine"){enginePuzzle();return}if(which==="mirror")U.say("The mirror's sequence","Touch the music box, wardrobe, portrait, and candle in that order.")
 }
 function drawer(){if(!S.get().completed.includes("drawer")){S.complete("drawer");reward("key-i");S.addNote("The unsigned office letter: “Four rooms will teach you the machine. The fifth answer belongs to you.”");U.say("Inside the drawer","A brass key and an unsigned letter. The telephone gives one last click, as if someone is still on the line.");S.save();render()}else U.say("The drawer","Only a dust outline remains where the key rested.")}
 function mirrorStep(h){
  const s=S.get(),sequence=["musicbox","wardrobe","painting","candle"],names=["Music note","Moon","Eye","Flame"],expected=sequence[s.mirrorProgress.length];
  if(h.id!==expected){s.mirrorProgress=[];U.toast("The mirror dims. The sequence begins again.");return}
  s.mirrorProgress.push(h.id);U.toast(names[s.mirrorProgress.length-1]+" answered.");
  if(s.mirrorProgress.length===4){GameAudio.effect("solved");S.complete("mirror");reward("key-iii");S.addItem("memory-photo");S.addNote("The photograph: “For the one who makes even a long walk feel short.”");U.say("The music box opens","The four objects answer in sequence. The music box opens, revealing Key III and a photograph.");S.save();render()}else S.save()
 }
 function enginePuzzle(){
  const s=S.get();if(s.endingSeen){finale();return}
  const steps=[
   {id:"time",label:"The past is never dead — it's not even past.",markup:'<input class="input" id="answer" inputmode="numeric" maxlength="4" placeholder="Four digits">',ok:v=>v.replace(/\D/g,"")==="1142"},
   {id:"recipe",label:"Life is like a recipe: what matters is not just the final result, but enjoying the process, the mistakes, and the combination of ingredients.",markup:'<input class="input" id="answer" inputmode="numeric" maxlength="4" placeholder="Four digits">',ok:v=>v.replace(/\D/g,"")==="5374"},
   {id:"mirror",label:"Everything you do reflects on you, like a bedroom mirror.",markup:'<div class="engine-symbol-grid"><button type="button" class="engine-symbol" data-symbol="flame"><span>♨</span><small>Flame</small></button><button type="button" class="engine-symbol" data-symbol="eye"><span>◉</span><small>Eye</small></button><button type="button" class="engine-symbol" data-symbol="piano"><span>🎹</span><small>Piano</small></button><button type="button" class="engine-symbol" data-symbol="moon"><span>☾</span><small>Crescent moon</small></button></div><p class="hint">Click the symbols in the order revealed by the bedroom poem.</p>',ok:()=>false},
   {id:"stars",label:"Choose the broken heart constellation.",markup:'<select id="answer" class="select"><option value="">Choose a constellation</option><option value="heart">Broken heart</option><option value="line">Straight line</option></select>',ok:v=>v==="heart"},
   {id:"memory",label:"One date to rule them all. One date to find them. One date to bring them and into love bind them.",markup:'<input class="input" id="answer" inputmode="numeric" maxlength="4" placeholder="DDMM">',ok:v=>v.replace(/\D/g,"")==="2503"}
  ];
  const step=steps.find(x=>!s.engineSteps.includes(x.id));if(!step){s.endingSeen=true;S.save();finale();return}
  const prompt='<p>Mechanism '+(s.engineSteps.length+1)+' of 5 · '+step.label+'<br><span class="hint">Use the clues in your notebook.</span></p>';
  if(step.id==="mirror"){
   let progress=0;const sequence=["piano","moon","eye","flame"],labels=["Music","Moon","Eye","Flame"];
   U.puzzle("Restore the Heart Engine",prompt,step.markup,()=>{},"Follow the poem");$("pcontrols").firstElementChild.classList.add("hidden");
   const symbols=[...document.querySelectorAll(".engine-symbol")];
   symbols.forEach(button=>button.addEventListener("click",()=>{
    if(button.dataset.symbol!==sequence[progress]){
     progress=0;symbols.forEach(symbol=>symbol.classList.remove("lit"));
     U.feedback("Wrong order. The lights reset; start again with Piano.");return
    }
    button.classList.add("lit");progress++;U.feedback(labels[progress-1]+" lights up.");
    if(progress===sequence.length){GameAudio.effect("solved");s.engineSteps.push(step.id);S.complete("engine-"+step.id);S.save();U.close("puzzle");enginePuzzle()}
   }));return
  }
  U.puzzle("Restore the Heart Engine",prompt,step.markup,()=>{
   if(!step.ok($("answer").value.trim())){$("feedback").textContent="The mechanism stays still. Revisit the room clues.";return}
   GameAudio.effect("solved");s.engineSteps.push(step.id);S.complete("engine-"+step.id);S.save();if(step.id==="memory"){s.endingSeen=true;S.save();finale()}else{U.close("puzzle");enginePuzzle()}
  },step.id==="memory"?"Enter the date":"Set mechanism")
 }
 function finale(){
  U.close("puzzle");GameAudio.effect("engine");
  const start=new Date(2025,8,9),now=new Date();let years=now.getFullYear()-start.getFullYear(),months=now.getMonth()-start.getMonth(),days=now.getDate()-start.getDate();
  if(days<0){months--;days+=new Date(now.getFullYear(),now.getMonth(),0).getDate()}if(months<0){years--;months+=12}if(years<0){years=0;months=0;days=0}
  const elapsed=[];if(years)elapsed.push(years+" year"+(years===1?"":"s"));if(months)elapsed.push(months+" month"+(months===1?"":"s"));elapsed.push(days+" day"+(days===1?"":"s"));
  $("ending-text").textContent=elapsed.join(", ").replace(/, ([^,]*)$/, " and $1")+". Four versions of you that have changed my life. More are yet to come. I love you ♥";
  const gallery=$("gallery");gallery.replaceChildren();
  for(let i=1;i<=4;i++){const frame=document.createElement("div");frame.className="photo";const img=document.createElement("img");img.src="assets/photographs/memory-0"+i+".png";img.alt="Personal photograph "+i;img.onerror=()=>img.remove();frame.append(img);gallery.append(frame)}
  setTimeout(()=>$("ending").classList.remove("hidden"),700);S.save()
 }
 $("play").onclick=()=>{$("title").classList.add("hidden");$("game-screen").classList.remove("hidden");S.save();render();setTimeout(()=>GameAudio.startGame(),1200)};
 document.addEventListener("pointerdown",()=>{if(!$("title").classList.contains("hidden"))GameAudio.startTitle();else GameAudio.startGame()},{once:true});
 const titleImage=new Image();titleImage.onload=()=>{$("title-art").classList.add("has-art");$("title-art").style.backgroundImage="url('assets/title-screen.png')"};titleImage.src="assets/title-screen.png";
 const playImage=new Image();playImage.onload=()=>{$("play").classList.add("has-art")};playImage.src="assets/ui/play-button.png";
 document.querySelectorAll("[data-tab]").forEach(b=>b.onclick=()=>{document.querySelectorAll("[data-tab]").forEach(x=>x.classList.toggle("active",x===b));$("inventory").classList.toggle("hidden",b.dataset.tab!=="inventory");$("notebook").classList.toggle("hidden",b.dataset.tab!=="notebook")});
 document.querySelectorAll(".action").forEach(b=>b.onclick=()=>{action=b.dataset.action;selectedItem=null;document.querySelectorAll(".action").forEach(x=>x.classList.toggle("active",x===b));$("selection").textContent=action==="look"?"Choose something to inspect":"Choose an inventory item, then a target"});
 $("save").onclick=()=>{S.save();U.toast("Game saved in this browser.")};$("load").onclick=()=>{if(S.load()){$("title").classList.add("hidden");$("game-screen").classList.remove("hidden");render();U.toast("Saved game loaded.")}else U.toast("No saved game found.")};
 $("sound").onclick=()=>{S.get().sound=!S.get().sound;GameAudio.setEnabled(S.get().sound);S.save();render()};$("full").onclick=()=>document.fullscreenElement?document.exitFullscreen():$("game").requestFullscreen?.();
 $("hint").onclick=()=>{const hints={reception:"Check the stopped clock, then compare it to the register's extension note.",kitchen:"Add ten grams to every recipe amount. Use tens digits in fridge-note order: strawberries, butter, flour, sugar.",bedroom:"Touch music box, wardrobe, portrait, and candle in the mirror poem's order.",observatory:"The stars travel east, west, up, then down: enter R, L, U, D.",engine:"Use the reception time, kitchen code, bedroom poem, broken-heart constellation, then the date."};U.say("A gentle nudge",hints[S.get().room],"HINT")};
 $("restart").onclick=()=>U.say("Start over?","This clears the saved story and returns to the title screen.","RESTART",[{label:"Restart",onClick:()=>{S.reset();U.close("dialogue");$("game-screen").classList.add("hidden");$("title").classList.remove("hidden");GameAudio.startTitle();render()}},{label:"Keep playing"}]);
 document.querySelectorAll("[data-close]").forEach(b=>b.onclick=()=>U.close(b.dataset.close));$("end-close").onclick=()=>U.close("ending");
 document.addEventListener("keydown",e=>{if(e.key==="Escape")["dialogue","puzzle","ending"].forEach(U.close);if(e.key.toLowerCase()==="h"&&!$("game-screen").classList.contains("hidden"))$("hint").click()});
 if(S.load()){$("title").classList.add("hidden");$("game-screen").classList.remove("hidden")}GameAudio.setEnabled(S.get().sound);render();if(!$("title").classList.contains("hidden"))GameAudio.startTitle()
})();

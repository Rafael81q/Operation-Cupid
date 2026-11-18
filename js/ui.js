/* Reusable dialogue and puzzle windows plus inventory/notebook rendering. */
window.GameUI=(()=>{
 const $=id=>document.getElementById(id);let timer;
 function toast(text){const el=$("toast");el.textContent=text;el.classList.add("show");clearTimeout(timer);timer=setTimeout(()=>el.classList.remove("show"),2200)}
 function close(id){$(id).classList.add("hidden")}
 function say(title,text,kicker="INSPECTION",buttons=[{label:"Close"}]){
  $("dtitle").textContent=title;$("body").textContent=text;$("kicker").textContent=kicker;const box=$("controls");box.replaceChildren();
  buttons.forEach(b=>{const x=document.createElement("button");x.textContent=b.label;x.onclick=b.onClick||(()=>close("dialogue"));box.append(x)});$("dialogue").classList.remove("hidden")
 }
 function puzzle(title,description,markup,submit,label="Try it"){
  $("ptitle").textContent=title;$("pcontent").innerHTML=description+markup;$("feedback").textContent="";const box=$("pcontrols");box.replaceChildren();const b=document.createElement("button");b.textContent=label;b.onclick=submit;box.append(b);$("puzzle").classList.remove("hidden")
 }
 function feedback(message,success=false){const el=$("feedback");el.textContent=message;el.classList.toggle("success",success)}
 function render(state,data){
  const items=$("items");items.replaceChildren();if(!state.inventory.length)items.innerHTML='<div class="note">Nothing yet. Curiosity is free to carry.</div>';
  state.inventory.forEach(id=>{const i=data.items[id];if(!i)return;const b=document.createElement("button");b.className="item";b.textContent=i.icon+"  "+i.name;b.onclick=()=>window.onInventoryItem?window.onInventoryItem(id):say(i.name,i.description,"INVENTORY");items.append(b)});
  const notes=$("notes");notes.replaceChildren();if(!state.notes.length)notes.innerHTML='<div class="note">Your notebook is empty. Look closely.</div>';
  state.notes.forEach(n=>{const d=document.createElement("div");d.className="note";d.textContent=n;notes.append(d)})
 }
 return {$,toast,close,say,puzzle,feedback,render};
})();

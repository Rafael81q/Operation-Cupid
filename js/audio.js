/* Optional audio files load silently when present; missing files never block play. */
window.GameAudio=(()=>{
 const files={
  title:"assets/audio/title-theme.ogg",
  game:"assets/audio/game-theme.ogg",
  ambience:"assets/audio/ambience.ogg",
  telephone:"assets/audio/telephone-voice.ogg",
  solved:"assets/audio/puzzle-solved.ogg",
  engine:"assets/audio/heart-engine.ogg",
  click:"assets/audio/ui-click.ogg"
 };
 let enabled=true,currentMusic=null,currentMusicName=null,ambience=null;
 const playing=new Set();
 function make(name,loop=false){const audio=new Audio(files[name]);audio.preload="auto";audio.loop=loop;return audio}
 function safePlay(audio){if(!enabled||!audio)return;const promise=audio.play();if(promise&&promise.catch)promise.catch(()=>{})}
 function playMusic(name){
  if(currentMusic&&currentMusicName===name&&!currentMusic.paused)return;
  if(currentMusic){currentMusic.pause();currentMusic.currentTime=0}
  currentMusic=make(name,true);currentMusicName=name;safePlay(currentMusic)
 }
 function playLoop(name){
  if(ambience){ambience.pause();ambience.currentTime=0}
  ambience=make(name,true);safePlay(ambience)
 }
 function effect(name){
  const audio=make(name,false);playing.add(audio);
  audio.addEventListener("ended",()=>playing.delete(audio),{once:true});safePlay(audio)
 }
 function setEnabled(value){
  enabled=Boolean(value);
  if(!enabled){if(currentMusic)currentMusic.pause();if(ambience)ambience.pause();playing.forEach(a=>a.pause());return}
  safePlay(currentMusic);safePlay(ambience);playing.forEach(safePlay)
 }
 function startTitle(){playMusic("title")}
 function startGame(){playMusic("game");playLoop("ambience")}
 return {startTitle,startGame,effect,setEnabled};
})();

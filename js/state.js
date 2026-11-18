/* Plain data makes browser saves compact and easy to inspect. */
window.GameState=(()=>{
 const fresh=()=>({room:"reception",inventory:[],notes:[],completed:[],mirrorProgress:[],ringsAligned:false,engineSteps:[],endingSeen:false,sound:true});
 let state=fresh();
 function save(){localStorage.setItem("operationCupidSave",JSON.stringify(state))}
 function load(){try{const data=JSON.parse(localStorage.getItem("operationCupidSave"));if(!data||!data.room)return false;state={...fresh(),...data};return true}catch{return false}}
 function reset(){state=fresh();localStorage.removeItem("operationCupidSave")}
 return {get:()=>state,save,load,reset,has:id=>state.inventory.includes(id),addItem:id=>{if(!state.inventory.includes(id))state.inventory.push(id)},addNote:n=>{if(n&&!state.notes.includes(n))state.notes.push(n)},complete:id=>{if(!state.completed.includes(id))state.completed.push(id)}};
})();

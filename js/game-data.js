/* Room and hotspot data is kept separate from the game logic. */
window.GameData={
 roomOrder:["reception","kitchen","bedroom","observatory","engine"],
 rooms:{
 reception:{title:"The Reception",caption:"RECEPTION",mood:"THE LAST APPOINTMENT",background:"assets/backgrounds/reception.png",hotspots:[
 {id:"clock",name:"Stopped clock",icon:"◷",x:65,y:35,description:"The old clock stopped at 11:42. Beneath it: “When the last appointment vanished, time did too.”",note:"The clock is frozen at 11:42."},
 {id:"register",name:"Appointment register",icon:"▤",x:37,y:60,description:"The last line is smudged, but the time is clear: 11:42. A note says: “extension mirrors the hour.”",note:"The register links the last appointment to the telephone extension."},
 {id:"phone",name:"Antique telephone",icon:"☎",x:48,y:60,description:"A four-digit telephone. Its label reads LAST APPOINTMENT EXTENSION.",puzzle:"phone"},
 {id:"desk",name:"Reception desk",icon:"▱",x:48,y:78,description:"A locked drawer has a brass plate marked KEY I.",puzzle:"drawer"},
 {id:"lamp",name:"Desk lamp",icon:"♨",x:28,y:56,description:"A note taped underneath reads: “Look where the visitor looked.”",note:"A note under the lamp says: “Look where the visitor looked.”"},
 {id:"door-kitchen",name:"Kitchen door",icon:"⇢",x:88,y:67,description:"A narrow door leads to the kitchen.",goTo:"kitchen"}]},
 kitchen:{title:"The Kitchen",caption:"KITCHEN",mood:"CUPID'S EMERGENCY RECIPE",background:"assets/backgrounds/kitchen.png",hotspots:[
 {id:"recipe",name:"Recipe book",icon:"▤",x:50,y:54,description:"Strawberry cake: flour 60 g, sugar 30 g, strawberries 40 g, butter 20 g. The scale adds 10 g to every reading.",note:"Strawberry cake recipe: flour 60 g, sugar 30 g, strawberries 40 g, butter 20 g. Scale readings are 10 g too high.",item:"recipe-card"},
 {id:"scale",name:"Broken scale",icon:"⚖",x:29,y:53,description:"The scale adds 10 g to every ingredient. A 40 g recipe amount will read 50 g. Enter the scale reading, then use its tens digit.",note:"The scale adds 10 g: add ten to each recipe amount before using its tens digit."},
 {id:"fridge",name:"Locked refrigerator",icon:"▯",x:77,y:58,description:"A four-digit lock. A note lists: strawberries __ g, butter __ g, flour __ g, sugar __ g. Fill each blank with its scale reading (recipe amount +10 g), then enter the tens digits in this note's order.",puzzle:"fridge"},
 {id:"cupboard",name:"Cupboard",icon:"▥",x:32,y:35,description:"Twelve mugs printed with Cupid's face. One has a moustache drawn on it.",note:"Someone has been amusing themselves with the office mugs."},
 {id:"door-bedroom",name:"Dreaming door",icon:"⇢",x:94,y:67,description:"A door leads into a bedroom that wasn't on the plans.",goTo:"bedroom"},
 {id:"back-reception",name:"Return to reception",icon:"⇠",x:5,y:68,description:"The reception is just through this door.",goTo:"reception"}]},
 bedroom:{title:"The Bedroom",caption:"THE BEDROOM",mood:"A ROOM OUTSIDE OF TIME",background:"assets/backgrounds/bedroom.png",hotspots:[
 {id:"mirror",name:"Ornate mirror",icon:"◈",x:84,y:58,description:"Looking through the mirror, you see through it: floating letters behind you read — “Music wakes the quiet room, / The Moon lays silver on the floor, / An Eye keeps watch behind your back, / A Flame closes the poem's door.”",note:"The mirror poem gives this order: Music → Moon → Eye → Flame."},
 {id:"musicbox",name:"Music box",icon:"♫",x:85,y:84,description:"A little box marked with a music note. It plays half a lullaby, then waits.",symbol:true},
 {id:"wardrobe",name:"Wardrobe",icon:"☾",x:67,y:53,description:"A moon is carved above the handle. The reflection shows it open.",symbol:true},
 {id:"painting",name:"Portrait",icon:"◉",x:49,y:33,description:"The painted eye follows you. The frame reads: “The one who sees what others miss.”",symbol:true},
 {id:"candle",name:"Candle",icon:"♨",x:40,y:55,description:"The flame leans toward the mirror, though there is no breeze.",symbol:true},
 {id:"bed",name:"Bedside table",icon:"▱",x:30,y:67,description:"A photograph shows two people laughing outside the office. Its back reads: “For the one who makes even a long walk feel short.”",item:"memory-photo",note:"A personal-looking photograph was tucked beside the bed."},
 {id:"door-observatory",name:"Star door",icon:"⇢",x:94,y:72,description:"A spiral stair climbs into the observatory.",goTo:"observatory"},
 {id:"back-kitchen",name:"Return to kitchen",icon:"⇠",x:6,y:72,description:"The kitchen is just through this door.",goTo:"kitchen"}]},
 observatory:{title:"The Observatory",caption:"OBSERVATORY",mood:"THE HEART CONSTELLATION",background:"assets/backgrounds/observatory.png",hotspots:[
 {id:"telescope",name:"Telescope",icon:"⌖",x:33,y:56,description:"Four bright stars form a broken heart. A fifth dim star sits just outside the pattern.",note:"The telescope shows a broken-heart constellation and one extra star."},
 {id:"chart",name:"Star chart",icon:"✧",x:87,y:63,description:"A riddle is written among the stars: “The moon keeps watch while four stars dance: first one wanders east, then one flees west; a third climbs toward the moon, and the last sinks below.”",note:"Star-chart riddle: east, west, rise, sink. The ring controls use R, L, U, D for right, left, up, down."},
 {id:"rings",name:"Astronomical rings",icon:"◎",x:66,y:40,description:"Four independently moving rings await four directions: R right, L left, U up, D down.",puzzle:"rings"},
 {id:"cabinet",name:"Star cabinet",icon:"▥",x:85,y:72,description:"A cabinet marked KEY IV. The lock will release when the heart constellation is aligned.",puzzle:"cabinet"},
 {id:"fifth-star",name:"The fifth star",icon:"✦",x:51,y:20,description:"This lonely star is warm. It pulses when you think of a familiar voice.",note:"A fifth star remains outside the pattern. It may be personal."},
 {id:"door-engine",name:"Descending stair",icon:"⇢",x:94,y:72,description:"Stairs descend to the building's core.",goTo:"engine"},
 {id:"back-bedroom",name:"Return to bedroom",icon:"⇠",x:6,y:72,description:"The bedroom lies below the stairs.",goTo:"bedroom"}]},
 engine:{title:"The Heart Engine",caption:"HEART ENGINE",mood:"THE MACHINE THAT MEASURES LOVE",background:"assets/backgrounds/heart-engine.png",hotspots:[
 {id:"engine",name:"Central mechanism",icon:"♥",x:50,y:46,description:"The Engine is quiet. Four key sockets surround a dark heart. The fifth socket is shaped like a small memory.",puzzle:"engine"},
 {id:"temporal",name:"Temporal dial",icon:"◷",x:15,y:81,description:"The dial waits for the time from the reception clock.",puzzle:"engine"},
 {id:"regulator",name:"Ingredient regulator",icon:"⚙",x:43,y:82,description:"Four notches, numbered by the recipe sequence.",puzzle:"engine"},
 {id:"reflection",name:"Reflection plate",icon:"◈",x:59,y:82,description:"The bedroom symbols are etched into this plate.",puzzle:"engine"},
 {id:"constellation",name:"Celestial lens",icon:"✧",x:85,y:81,description:"The heart constellation must be placed here.",puzzle:"engine"},
 {id:"back-observatory",name:"Return to observatory",icon:"⇠",x:6,y:72,description:"The stairs lead back to the observatory.",goTo:"observatory"}]}
 },
 items:{
 "key-i":{name:"Key I",icon:"🗝",description:"A warm brass key marked RECEPTION."},"key-ii":{name:"Key II",icon:"🗝",description:"A copper key from the refrigerator, smelling faintly of chocolate."},"key-iii":{name:"Key III",icon:"🗝",description:"A silver key tucked inside the music box."},"key-iv":{name:"Key IV",icon:"🗝",description:"A dark violet key from the observatory cabinet."},"recipe-card":{name:"Recipe card",icon:"🍓",description:"The recipe order and scale calibration are written here."},"memory-photo":{name:"Photograph",icon:"▧",description:"A small photograph showing a shared memory. Replace it with your photo."}
 }
};

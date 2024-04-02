function onresize() {
    //note i need to pass the event as an argument to the function
    width = window.innerWidth;
    document.documentElement.style.setProperty(`--screnWidth`, width + 'px');
    console.log("Resized: " + width + "px")
 }

 function getPositionXY(element) {
    var rect = element.getBoundingClientRect();
    //document.getElementById('text').innerHTML = 'X Coordinate= ' + rect.x + '<br>' + 'Y'
    document.documentElement.style.setProperty(`--cord`, rect.x + 'px');
    document.documentElement.style.setProperty(`--navElementWidth`, element.clientWidth + 1 + 'px');
    //Coordinate = ' + rect.y';
 }

 /*
function getMembers(){
var elements = document.getElementsByClassName("Members")
for(let element of elements)
    console.log(element.className)


}
*/



 window.addEventListener("resize", onresize);
 window.addEventListener("load", onresize);
 //window.addEventListener("load", getMembers);
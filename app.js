const circleElement = document.querySelector('.circle');
const mouse = {x: 0, y: 0};
const previousMouse = {x: 0, y: 0}
const circle = {x: 0, y: 0};
const speed = 0.17;

let currentScale = 0;
let currentAngle = 0;

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
document.addEventListener("mousemove", mouseMove);

function mouseMove(e){
    mouse.x = e.x
    mouse.y = e.y
    console.log(mouse)
}


    


const tick = () => {
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;

    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`

    //Squeeze
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;

    const mouseVelocity = Math.min(Math.sqrt(deltaMouseX**2 + deltaMouseY**2), 150);
    const scaleValue = (mouseVelocity / 150) * 0.5;
    const angle = Math.atan2(deltaMouseY, deltaMouseX) * 180 / Math.PI;


    if (mouseVelocity > 20) {
        currentAngle = angle;
    }
    currentScale += (scaleValue - currentScale) * speed;
    

    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;
    const rotateTransform = `rotate(${currentAngle}deg)`;
    document.documentElement.style.setProperty(`--circle-transform`, [translateTransform, rotateTransform, scaleTransform]);
    circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

    window.requestAnimationFrame(tick);
}





  //this is the important bit
tick();
window.addEventListener("resize", onresize);
window.addEventListener("load", onresize);
//window.addEventListener("load", getMembers);
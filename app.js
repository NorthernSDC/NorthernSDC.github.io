const circleElement = document.querySelector('.circle');
const htmlCircleElement = document.getElementById('circlee') 
const mouse = {x: 0, y: 0};
const previousMouse = {x: 0, y: 0}
const circle = {x: 0, y: 0};
const speed = 0.17;

var circleVisible = false;
var circleIsAnimating = false;

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
    if(!circleIsAnimating){
        mouse.x = e.x
        mouse.y = e.y
    }



    console.log(mouse)
}


const bad = ["<center>","[object HTMLDivElement]","[object HTMLUListElement]","[object HTMLUListElement]","[object HTMLLIElement]","http:","[object HTMLHeadingElement]"];
function animater(e){
    var element = document.elementFromPoint(e.x, e.y);
    //var label = element.textContent;
    console.log(element)
    var tostringer = String(element)
    var works = element + ""
    console.log("Tag name: " + works)
    if(bad.includes(tostringer) || element.tagName == "BODY")
    {
        htmlCircleElement.style.animation = "rectAnimeCrc 2000ms linear forwards"

        htmlCircleElement.style.height = "40px"
        htmlCircleElement.style.width = "40px"
        circleIsAnimating = false;

    }
    else{
    
        var btrElement = element.getElementsByTagName("strong")
        console.log(btrElement)
        var rect = element.getBoundingClientRect()
        circleIsAnimating = true;

        mouse.x = rect.x
        mouse.y = rect.y + 10

        htmlCircleElement.style.animation = "rectAnimeSqr 150ms linear forwards"
        htmlCircleElement.style.animation
        htmlCircleElement.style.rotate = Math.atan2(1, 0) * 180 / Math.PI; //We be mathing
        htmlCircleElement.style.width = rect.width +30 + "px";
        htmlCircleElement.style.height = rect.height + 10 + "px";
    }
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
    if(!circleIsAnimating){
        const rotateTransform = `rotate(${currentAngle}deg)`;
        //document.documentElement.style.setProperty(`--circle-transform`, [translateTransform, rotateTransform, scaleTransform]);
        circleElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;
    }
    else{
        circleElement.style.transform = `${translateTransform}`;
    }
    
    
    window.requestAnimationFrame(tick);
}


function isMouseOver(){
    console.log("Yes, yes it is.")
}

function noCircle(e){
    console.log(e.key)
}

circleElement.style.borderRadius = '100%' //Put this somewhere else later
  //this is the important bit
tick();

document.onkeydown = function(evt) {
    
    evt = evt || window.event;
    if (evt.keyCode == 67) {
        if(circleVisible){
            
            //alert("Circle has been turned off.");
            htmlCircleElement.style.visibility = "hidden";
            
        }
        else{
            //alert("Circle has been turned on.");
            htmlCircleElement.style.visibility = "visible";
        }
        circleVisible = !circleVisible
    }
    
};
htmlCircleElement.style.visibility = "hidden";
window.addEventListener("mousemove", animater)
window.addEventListener("resize", onresize);
window.addEventListener("load", onresize);
//window.addEventListener("load", getMembers);
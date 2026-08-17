const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".navbar ul");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});





const numberOfCircles = 15;

const circles = [];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


/* Create circles */

for (let i = 0; i < numberOfCircles; i++) {

    const circle = document.createElement("div");

    circle.className = "cursor-circle";

    const size = Math.max(4, 18 - i);

    circle.style.width = size + "px";
    circle.style.height = size + "px";

    circle.style.opacity = 1 - (i / numberOfCircles);

    document.body.appendChild(circle);

    circles.push({
        element: circle,
        x: mouseX,
        y: mouseY
    });
}


/* Get mouse position */

document.addEventListener("mousemove", function(event) {

    mouseX = event.clientX;
    mouseY = event.clientY;

});


/* Animation */

function animate() {

    let targetX = mouseX;
    let targetY = mouseY;

    circles.forEach(function(circle, index) {

        circle.x += (targetX - circle.x) * 0.2;
        circle.y += (targetY - circle.y) * 0.2;

        circle.element.style.left = circle.x + "px";
        circle.element.style.top = circle.y + "px";

        targetX = circle.x;
        targetY = circle.y;

    });

    requestAnimationFrame(animate);
}

animate();





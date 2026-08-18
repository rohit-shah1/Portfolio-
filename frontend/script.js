/* =========================================
   HAMBURGER MENU
========================================= */

const hamburger =
    document.getElementById("hamburger");

const navLinks =
    document.querySelector(".navbar ul");


if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}



/* =========================================
   CURSOR TRAIL
========================================= */

const numberOfCircles = 15;

const circles = [];

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;


/* Create circles */

for (let i = 0; i < numberOfCircles; i++) {

    const circle =
        document.createElement("div");

    circle.className =
        "cursor-circle";


    /* Size */

    const size =
        Math.max(4,40 - i);

    circle.style.width =
        size + "px";

    circle.style.height =
        size + "px";


    /* Opacity */

    circle.style.opacity =
        1 - (i / numberOfCircles);


    document.body.appendChild(circle);


    circles.push({

        element: circle,

        x: mouseX,

        y: mouseY

    });

}


/* Mouse position */

document.addEventListener(
    "mousemove",
    (event) => {

        mouseX = event.clientX;

        mouseY = event.clientY;

    }
);


/* Cursor animation */

function animateCursor() {

    let targetX = mouseX;
    let targetY = mouseY;


    circles.forEach((circle) => {

        circle.x +=
            (targetX - circle.x) * 0.2;

        circle.y +=
            (targetY - circle.y) * 0.2;


        circle.element.style.left =
            circle.x + "px";

        circle.element.style.top =
            circle.y + "px";


        targetX = circle.x;
        targetY = circle.y;

    });


    requestAnimationFrame(
        animateCursor
    );

}


animateCursor();





/* =========================================
   PROJECT CAROUSEL
========================================= */

const projectCarousel =
    document.querySelector(
        ".project-carousel"
    );

const projectCards =
    document.querySelectorAll(
        ".project-card"
    );


/*
   Only run if project carousel
   actually exists
*/

if (
    projectCarousel &&
    projectCards.length > 0
) {

    const totalCards =
        projectCards.length;


    /* =====================================
       SPEED SETTINGS
    ===================================== */

    let progress = 0;


    let currentSpeed =
        0.0008;

    let targetSpeed =
        0.0008;


    const normalSpeed =
        0.0008;

    const slowSpeed =
        0.00015;



    /* =====================================
       HOVER → SLOW DOWN
    ===================================== */

    projectCards.forEach((card) => {


        card.addEventListener(
            "mouseenter",
            () => {

                /*
                   Only slow animation
                   on desktop
                */

                if (
                    window.innerWidth > 600
                ) {

                    targetSpeed =
                        slowSpeed;

                }

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                if (
                    window.innerWidth > 600
                ) {

                    targetSpeed =
                        normalSpeed;

                }

            }
        );

    });



    /* =====================================
       PROJECT ANIMATION
    ===================================== */

    function animateProjects() {


        /*
           IMPORTANT:

           Mobile screen par
           animation completely stop.
        */

        if (
            window.innerWidth <= 600
        ) {

            /*
               Cards ko normal state mein rakho
            */

            projectCards.forEach(
                (card) => {

                    card.style.transform =
                        "none";

                    card.style.opacity =
                        "1";

                    card.style.zIndex =
                        "1";

                }
            );


            /*
               Animation loop continue
               nahi karna.
            */

            return;

        }



        /* =================================
           SMOOTH SPEED
        ================================= */

        currentSpeed +=
            (
                targetSpeed -
                currentSpeed
            ) * 0.05;



        /* =================================
           MOVE
        ================================= */

        progress +=
            currentSpeed;



        /* =================================
           LOOP
        ================================= */

        if (progress >= 1) {

            progress = 0;

        }



        /* =================================
           SEMICIRCLE SIZE
        ================================= */

        const radiusX =
            Math.min(
                projectCarousel.clientWidth *
                0.42,

                600
            );


        const radiusY =
            180;



        /* =================================
           MOVE EACH CARD
        ================================= */

        projectCards.forEach(
            (card, index) => {


                /*
                   Give every card
                   different position
                */

                let position =
                    (
                        index /
                        totalCards
                    ) + progress;



                /*
                   Keep between 0 and 1
                */

                position =
                    position % 1;



                /*
                   Convert:

                   0 → 1

                   into:

                   PI → 0

                   LEFT → TOP → RIGHT
                */

                const theta =
                    Math.PI -
                    (
                        position *
                        Math.PI
                    );



                /* =================================
                   X POSITION
                ================================= */

                const x =
                    Math.cos(theta) *
                    radiusX;



                /* =================================
                   Y POSITION
                ================================= */

                const y =
                    -Math.sin(theta) *
                    radiusY;



                /* =================================
                   DEPTH
                ================================= */

                const depth =
                    Math.sin(theta);



                /* =================================
                   SCALE
                ================================= */

                const scale =
                    0.75 +
                    (
                        depth *
                        0.25
                    );



                /* =================================
                   OPACITY
                ================================= */

                const opacity =
                    0.45 +
                    (
                        depth *
                        0.55
                    );



                /* =================================
                   APPLY POSITION
                ================================= */

                card.style.transform = `

                    translate(

                        calc(
                            -50% + ${x}px
                        ),

                        calc(
                            -50% + ${y}px
                        )

                    )

                    scale(${scale})

                `;



                /* =================================
                   OPACITY
                ================================= */

                card.style.opacity =
                    opacity;



                /* =================================
                   Z-INDEX
                ================================= */

                card.style.zIndex =
                    Math.round(
                        depth * 100
                    );

            }
        );



        /*
           Continue animation
        */

        requestAnimationFrame(
            animateProjects
        );

    }



    /* =====================================
       START
    ===================================== */

    animateProjects();

}
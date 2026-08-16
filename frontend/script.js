 const hamburger = document.getElementById("hamburger");
    const navLinks = document.querySelector(".navbar ul");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
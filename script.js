function toggleSidebar(event) {
    event.preventDefault();  // Prevent the anchor link's default behavior
    document.getElementById("sidebar").classList.toggle("active");
}

const backgrounds = ['home/gdynia.jpg', 'home/truck.jpg', 'home/truck2.jpg', 'home/truck3.jpg'];
const home = document.getElementById('home');

// Create background divs dynamically
backgrounds.forEach((image, index) => {
    const div = document.createElement('div');
    div.classList.add('bg-image');
    if (index === 0) div.classList.add('active'); // First image visible
    div.style.backgroundImage = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.65) 100%), url(${image})`;
    home.appendChild(div);
});

const bgImages = document.querySelectorAll('.bg-image');
let currentIndex = 0;

setInterval(() => {
    const nextIndex = (currentIndex + 1) % backgrounds.length;

    // Fade out current image
    bgImages[currentIndex].classList.remove('active');
    
    // Fade in next image
    bgImages[nextIndex].classList.add('active');

    currentIndex = nextIndex;
}, 8000);

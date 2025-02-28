document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("custom-toggle");

    function updateSliderColor(value) {
        const colors = {
            1: "#FF5733",
            2: "#33FF57",
            3: "#3357FF"
        };
        slider.style.backgroundColor = colors[value] || "#333"; // Default if something breaks
    }

    // Initialize color
    updateSliderColor(slider.value);

    // Change color on input
    slider.addEventListener("input", function () {
        updateSliderColor(this.value);
    });
});
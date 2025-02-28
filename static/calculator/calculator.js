document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById("custom-toggle");

    function updateSliderColor(value) {
        const colors = {
            1: "#7d7d7d",
            2: "#fb7500",
            3: "#b00000"
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
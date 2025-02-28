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

    function updateSliderValue(value) {
        const values = {
            1: "Basic",
            2: "Additional",
            3: "Advanced"
        };
        document.getElementById("calculatorMode").textContent = values[value] || "Unknown";
    }

    function updateCalculatorVisibility(value) {
        const additionalCalculator = document.querySelector(".additionalCalculatorBody");
        const advancedCalculator = document.querySelector(".advancedCalculatorBody");
    
        additionalCalculator.style.visibility = "hidden";
        advancedCalculator.style.visibility = "hidden";
    
        if (value == 2) {
            additionalCalculator.style.visibility = "visible";
        } else if (value == 3) {
            additionalCalculator.style.visibility = "visible";
            advancedCalculator.style.visibility = "visible";
        }
    }
    
    // Get the current value of the slider (in case it was saved)
    const currentValue = slider.value;

    // Initialize UI on page load
    updateSliderColor(currentValue);
    updateSliderValue(currentValue);
    updateCalculatorVisibility(currentValue);

    // Change UI on input
    slider.addEventListener("input", function () {
        updateSliderColor(this.value);
        updateSliderValue(this.value);
        updateCalculatorVisibility(this.value);
    });
});
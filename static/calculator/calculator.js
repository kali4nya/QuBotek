//design
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
        const presetsCalculator = document.querySelector(".presetsCalculatorBody");
    
        additionalCalculator.style.visibility = "hidden";
        advancedCalculator.style.visibility = "hidden";
        presetsCalculator.style.transform = "translateX(-50vw)";
    
        if (value == 2) {
            additionalCalculator.style.visibility = "visible";
            presetsCalculator.style.transform = "translateX(-25vw)";

        } else if (value == 3) {
            additionalCalculator.style.visibility = "visible";
            advancedCalculator.style.visibility = "visible";
            presetsCalculator.style.transform = "translateX(0)";
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

//functionality //setting max values
function setPreset(arg){
    if (arg === "basic136"){
        document.getElementById("volumeMax").value = 80;
        document.getElementById("loadingAreaMax").value = 13.20;
        document.getElementById("weightMax").value = 24000;
    }else if(arg === "bus"){
        document.getElementById("volumeMax").value = 25;
        document.getElementById("loadingAreaMax").value = 3.20;
        document.getElementById("weightMax").value = 1200;
    }else if(arg === "van"){
        document.getElementById("volumeMax").value = 10;
        document.getElementById("loadingAreaMax").value = 2.40;
        document.getElementById("weightMax").value = 900;
    }else if(arg === "35ton"){
        document.getElementById("volumeMax").value = 33;
        document.getElementById("loadingAreaMax").value = 5.60;
        document.getElementById("weightMax").value = 3500;
    }else if(arg === "smallSet"){
        document.getElementById("volumeMax").value = 68;
        document.getElementById("loadingAreaMax").value = 10.40;
        document.getElementById("weightMax").value = 6500;
    }else if(arg === "8ton"){
        document.getElementById("volumeMax").value = 45;
        document.getElementById("loadingAreaMax").value = 7.20;
        document.getElementById("weightMax").value = 8000;
    }else if(arg === "set"){
        document.getElementById("volumeMax").value = 120;
        document.getElementById("loadingAreaMax").value = 15.20;
        document.getElementById("weightMax").value = 22000;
    }else if(arg === "jumbo"){
        document.getElementById("volumeMax").value = 105;
        document.getElementById("loadingAreaMax").value = 13.20;
        document.getElementById("weightMax").value = 24000;
    }
}
//functionality //calculating using coefficients
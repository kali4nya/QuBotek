document.addEventListener("DOMContentLoaded", function () {
    let toggle = document.getElementById("editToggle");
    let cells = document.querySelectorAll("td input");

    function updateCells() {
        let isEditable = toggle.checked;

        cells.forEach(cell => {
            if (isEditable) {
                cell.removeAttribute("readonly");
                cell.style.userSelect = "auto";
            } else {
                cell.setAttribute("readonly", true);
                cell.style.userSelect = "none";
            }
        });

        document.getElementById("toggleLabel").textContent = isEditable ? "Editing enabled" : "Editing disabled";
    }

    // Run the function immediately on page load
    updateCells();

    // Also run it when the toggle is changed
    toggle.addEventListener("change", updateCells);
});

function saveData() {
    let table = document.querySelector("table");
    let data = [];

    // Get the header row
    let headerRow = [];
    table.querySelectorAll("thead th").forEach(th => {
        headerRow.push(th.innerText.trim()); // Get text from header
    });
    data.push(headerRow); // Add header row to data

    // Get the table body rows
    let rows = document.querySelectorAll("tbody tr");
    rows.forEach(row => {
        let rowData = [];
        row.querySelectorAll("input").forEach(input => {
            rowData.push(input.value);
        });
        data.push(rowData);
    });

    fetch("/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: data })
    })
    .then(response => response.json())
    .then(result => {
        if (result.message === "Unauthorized") {
            alert("You are not authorized to save changes!");
        } else {
            alert(result.message);
        }
    })
    .catch(error => console.error("Error saving data:", error));
}
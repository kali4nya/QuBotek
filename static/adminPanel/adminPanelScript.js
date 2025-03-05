document.getElementById("editToggle").addEventListener("change", function() {
    let cells = document.querySelectorAll("td input");
    let isEditable = this.checked;

    cells.forEach(cell => {
        if (isEditable) {
            cell.removeAttribute("readonly");
        } else {
            cell.setAttribute("readonly", true);
        }
    });

    document.getElementById("toggleLabel").textContent = isEditable ? "Disable Editing" : "Enable Editing";
});


function saveData() {
    let rows = document.querySelectorAll("tbody tr");
    let data = [];
    
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
    }).then(response => response.json())
        .then(result => alert(result.message));
}
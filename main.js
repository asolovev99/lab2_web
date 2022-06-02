let amountOfColumnsInTable = 4;
let table = document.getElementById("tableTownsInfo");

function addRowInTable(country, town, coordinates, amountOfPeople) {
    let bodyOfTable = table.getElementsByTagName("tbody").item(0);
    let newRow = document.createElement("tr");
    let newColumns = [];

    for (let i = 0; i < amountOfColumnsInTable; i++) {
        newColumns.push(document.createElement("td"));
    }
    newColumns[0].innerHTML = country;
    newColumns[1].innerHTML = town;
    newColumns[2].innerHTML = coordinates;
    newColumns[3].innerHTML = amountOfPeople;

    for (let i = 0; i < amountOfColumnsInTable; i++) {
        newRow.appendChild(newColumns[i]);
    }

    bodyOfTable.appendChild(newRow);
}

function clearTable() {
    let bodyOfTable = table.getElementsByTagName("tbody").item(0);

    while (bodyOfTable.firstElementChild) {
        bodyOfTable.firstElementChild.remove();
    }
}

document.getElementById("buttonSearch").addEventListener("click", (e) => {

    })
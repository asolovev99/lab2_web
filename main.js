let amountOfColumnsInTable = 4;
let table = document.getElementById("tableTownsInfo");

let currentTown = "";
let currentSort = "";
let currentOffsetOfTowns = 0;
let currentLimitOfTownsOnPage = 5;
let amountOfAllTownsWithCurrentOptions = 0;

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

async function doRequestAndUpdateTable(firstLettersOfTown, sort, limitOfTowns, offset) {
    let stringOfRequest = "http://geodb-free-service.wirefreethought.com/v1/geo/cities?namePrefix=" + firstLettersOfTown + "&sort=" +
        sort + "&limit=" + limitOfTowns.toString() + "&offset=" + offset.toString();

    console.log(stringOfRequest);

    const response = await fetch(stringOfRequest);
    const responseJson = await response.json();

    if (response.ok) {
        clearTable();

        amountOfAllTownsWithCurrentOptions = responseJson.metadata.totalCount;
        for (let currentTownFromJson of responseJson.data) {
            addRowInTable(currentTownFromJson.country, currentTownFromJson.city, currentTownFromJson.latitude.toString() + " " + currentTownFromJson.longitude.toString(), currentTownFromJson.population);
        }
    }   
}

document.getElementById("buttonSearch").addEventListener("click", (e) => {
    let limitOfTownsOnPage = document.getElementById("inputAmountOfCities").value;

    if (parseInt(limitOfTownsOnPage) >= 0 && parseInt(limitOfTownsOnPage) <= 10) {
        let town = document.getElementById("inputTown").value;
        currentTown = town;

        let selectSort = document.getElementById("selectSort");
        let selectedSort = null;
        for (let currentOption of selectSort.children) {
            if (currentOption.selected === true) {
                selectedSort = currentOption;
            }
        }
        currentSort = selectedSort.value;        

        currentOffsetOfTowns = 0;

        currentLimitOfTownsOnPage = parseInt(limitOfTownsOnPage);
        doRequestAndUpdateTable(town, currentSort, currentLimitOfTownsOnPage, currentOffsetOfTowns);
    }
});

document.getElementById("buttonPreviousListOfTowns").addEventListener("click", (e) => {
    if (currentOffsetOfTowns > 0) {
        currentOffsetOfTowns -= currentLimitOfTownsOnPage;

        doRequestAndUpdateTable(currentTown, currentSort, currentLimitOfTownsOnPage, currentOffsetOfTowns);
    }    
});

document.getElementById("buttonNextListOfTowns").addEventListener("click", (e) => {
    if (currentOffsetOfTowns + currentLimitOfTownsOnPage < amountOfAllTownsWithCurrentOptions) {
        currentOffsetOfTowns += currentLimitOfTownsOnPage;

        doRequestAndUpdateTable(currentTown, currentSort, currentLimitOfTownsOnPage, currentOffsetOfTowns);
    }
});
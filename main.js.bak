import {Spinner} from './spin.js';

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

    let opts = {
        lines: 13, // The number of lines to draw
        length: 36, // The length of each line
        width: 13, // The line thickness
        radius: 32, // The radius of the inner circle
        scale: 0.1, // Scales overall size of the spinner
        corners: 1, // Corner roundness (0..1)
        speed: 1, // Rounds per second
        rotate: 0, // The rotation offset
        animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
        direction: 1, // 1: clockwise, -1: counterclockwise
        color: '#000000', // CSS color or array of colors
        fadeColor: 'transparent', // CSS color or array of colors
        top: '9px', // Top position relative to parent
        left: '290px', // Left position relative to parent
        shadow: '0 0 1px transparent', // Box-shadow for the lines
        zIndex: 2000000000, // The z-index (defaults to 2e9)
        className: 'spinner', // The CSS class to assign to the spinner
        position: 'relative', // Element positioning
    };

    let spinner = new Spinner(opts).spin(document.getElementById("divInputNameOfTown"));
    const response = await fetch(stringOfRequest);
    const responseJson = await response.json();
    spinner.stop();

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









//let spinner = new Spinner(opts).spin(document.getElementById("divInputNameOfTown"));
//document.getElementById("divSpinner").appendChild(spinner.el);

//let spinner1 = new Spinner(opts).spin(document.getElementById("labelSpinner"));
//document.getElementById("labelSpinner").appendChild(spinner1.el);


//spinner.stop();
//spinner1.stop();

//spinner.spin();
//spinner1.spin();
//spinner.sp
//target.appendChild(spinner.el);
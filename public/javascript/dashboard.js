window.onload = async function () {
    const data = await getItemData();
    // populate table with data
    populateTable(data.rows);
    addPageButtons(data.data);

    // search func
    const searchButton = document.getElementById("search-btn");
    const searchText = document.getElementById("search-text");
    searchText.value = "";
    const clearButton = document.getElementById("search-clear-btn");
    searchButton.addEventListener("click", async () => {
        document.getElementById("page-link-list").style.display = "none";
        const results = await getSearchData(searchText.value);
        populateTable(results);
    });
    clearButton.addEventListener("click", () => {
        location.reload();
    });
};

async function getItemData(offset = 0) {
    return await fetch(`/items?offset=${offset}`, {
        method: "GET",
    })
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        })
        .then((res) => res.json());
}

function populateTable(rows) {
    const table = document.getElementById("item-table");
    const rowCount = table.rows.length - 1;
    for (let i = 0; i < rowCount; i++) {
        table.deleteRow(-1);
    }
    rows.forEach((row) => {
        let tableRow = table.insertRow();

        let newCell1 = tableRow.insertCell();
        let newLink1 = document.createElement("a");
        newLink1.setAttribute("href", `/edit-item/${row.item_id}`);
        let newText1 = document.createTextNode(row.name);
        newCell1.appendChild(newLink1).appendChild(newText1);

        let newCell2 = tableRow.insertCell();
        let newText2 = document.createTextNode(
            (Math.round(row.price * 100) / 100).toFixed(2)
        );
        newCell2.appendChild(newText2);

        let newCell3 = tableRow.insertCell();
        let newText3 = document.createTextNode(
            row.availability ? "IN-STOCK" : "OUT-OF-STOCK"
        );
        newCell3.appendChild(newText3);
    });
}

function addPageButtons(data) {
    // add page buttons
    const previous = document.getElementById("previous-link");
    const next = document.getElementById("next-link");
    previous.setAttribute("data-previous-offset", data.previousOffset);
    previous.getElementsByTagName("button")[0].setAttribute("tabIndex", -1);
    next.setAttribute("data-next-offset", data.nextOffset);
    next.getElementsByTagName("button")[0].setAttribute("tabIndex", -1);

    if (previous.dataset.previousOffset < 0) {
        previous.classList.add("disabled");
    }

    if (next.dataset.nextOffset < 0) {
        next.classList.add("disabled");
    }

    previous.addEventListener("click", async () => {
        if (previous.dataset.previousOffset < 0) return;
        const itemData = await getItemData(previous.dataset.previousOffset);
        updatePreviousAndNextButtons(itemData);
        populateTable(itemData.rows);
    });

    next.addEventListener("click", async () => {
        if (next.dataset.nextOffset < 0) return;
        const itemData = await getItemData(next.dataset.nextOffset);
        updatePreviousAndNextButtons(itemData);
        populateTable(itemData.rows);
    });

    for (let i = 0; i < data.totalPages; i++) {
        const listElem = document.createElement("li");
        listElem.className = "page-item";
        listElem.setAttribute("tabIndex", -1);
        const button = document.createElement("button");
        button.className = "page-link";
        button.setAttribute("tabIndex", -1);
        button.innerText = i + 1;
        listElem.appendChild(button);

        listElem.addEventListener("click", async () => {
            const itemData = await getItemData(i * data.limit);
            updatePreviousAndNextButtons(itemData);
            populateTable(itemData.rows);
        });
        next.parentNode.insertBefore(listElem, next.previousSibling);
    }

    function updatePreviousAndNextButtons(itemData) {
        previous.setAttribute(
            "data-previous-offset",
            itemData.data.previousOffset
        );
        next.setAttribute("data-next-offset", itemData.data.nextOffset);

        if (previous.dataset.previousOffset < 0) {
            previous.classList.add("disabled");
        } else {
            previous.classList.remove("disabled");
        }
        if (next.dataset.nextOffset < 0) {
            next.classList.add("disabled");
        } else {
            next.classList.remove("disabled");
        }
    }
}

async function getSearchData(keyword) {
    if (!keyword) return;
    return await fetch(`/search/vendor/?name=${keyword}`, {
        method: "GET",
    })
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        })
        .then((res) => res.json());
}

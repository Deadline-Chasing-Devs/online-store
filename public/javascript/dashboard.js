window.onload = async function () {
    const data = await getItemData();
    // populate table with data
    populateTable(data);
    console.log(data.data);
    addPageButtons(data.data);
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

function populateTable(data) {
    const table = document.getElementById("item-table");
    const rowCount = table.rows.length - 1;
    for (let i = 0; i < rowCount; i++) {
        table.deleteRow(-1);
    }
    data.rows.forEach((row) => {
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
    });
}

function addPageButtons(data) {
    // add page buttons
    const previous = document.getElementById("previous-link");
    previous.addEventListener("click", async () => {
        const itemData = await getItemData(data.previousOffset);
        populateTable(itemData);
    });

    const next = document.getElementById("next-link");
    next.addEventListener("click", async () => {
        const itemData = await getItemData(data.nextOffset);
        populateTable(itemData);
    });

    for (let i = 0; i < data.totalPages; i++) {
        const listElem = document.createElement("li");
        listElem.className = "page-item";
        const button = document.createElement("button");
        button.className = "page-link";
        button.innerText = i + 1;
        listElem.appendChild(button);
        
        listElem.addEventListener("click", async () => {
            const itemData = await getItemData(i * data.limit);
            populateTable(itemData);
        });
        next.parentNode.insertBefore(listElem, next.previousSibling);
    }
}

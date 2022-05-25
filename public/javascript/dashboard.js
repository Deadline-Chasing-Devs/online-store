window.onload = function () {
    fetch("/items", {
        method: "GET",
    })
        .then((res) => {
            if (res.status >= 200 && res.status < 300) {
                return Promise.resolve(res);
            } else {
                return Promise.reject(new Error(res.statusText));
            }
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            const table = document.getElementById("item-table");
            data.rows.forEach((row) => {
                let tableRow = table.insertRow();

                let newCell1 = tableRow.insertCell();
                let newLink1 = document.createElement("a");
                newLink1.setAttribute("href", `/edit-item/${row.item_id}`);
                let newText1 = document.createTextNode(row.name);
                newCell1.appendChild(newLink1).appendChild(newText1);


                let newCell2 = tableRow.insertCell();
                let newText2 = document.createTextNode(row.price);
                newCell2.appendChild(newText2);
            });
        });
};

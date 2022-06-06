window.onload = async function () {
    const quantity = document.getElementById("quantity");
    const addToCart = document.getElementById("add-to-cart-btn");
    const itemId = addToCart.getAttribute("data-item-id");

    addToCart.addEventListener("click", async () => {
        const result = await fetch("/cart/add-item", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                itemId: itemId,
                quantity: quantity.value,
            }),
        })
            .then((res) => {
                if ((res.status >= 200 && res.status < 300) || res.status == 400) {
                    return Promise.resolve(res);
                } else {
                    return Promise.reject(new Error(res.statusText));
                }
            })
            .then((res) => res.json());

        if (result.success) {
            showAddedMessage();
        } else {
            showErrorMessage(result.message);
        }
    });
};

function showAddedMessage() {
    const infoDiv = document.getElementsByClassName("info")[0];
    const itemName = document.getElementById("item-name");
    const newDiv = document.createElement("div");
    newDiv.classList = "alert alert-success alert-dismissible";
    const newAnchor = document.createElement("a");
    newAnchor.classList = "close";
    newAnchor.setAttribute("href", "#");
    newAnchor.setAttribute("data-dismiss", "alert");
    newAnchor.innerHTML = "&times;";
    const textNode = document.createTextNode("Successfully added item to the cart.");
    newDiv.appendChild(textNode);
    newDiv.appendChild(newAnchor);
    infoDiv.insertBefore(newDiv, itemName);
}

function showErrorMessage(msg) {
    const infoDiv = document.getElementsByClassName("info")[0];
    const itemName = document.getElementById("item-name");
    const newDiv = document.createElement("div");
    newDiv.classList = "alert alert-danger alert-dismissible";
    const newAnchor = document.createElement("a");
    newAnchor.classList = "close";
    newAnchor.setAttribute("href", "#");
    newAnchor.setAttribute("data-dismiss", "alert");
    newAnchor.innerHTML = "&times;";
    const textNode = document.createTextNode(msg);
    newDiv.appendChild(textNode);
    newDiv.appendChild(newAnchor);
    infoDiv.insertBefore(newDiv, itemName);
}

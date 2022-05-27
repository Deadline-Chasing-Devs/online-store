window.onload = function () {
    const deleteButtons = document.getElementsByClassName("delete-btn");
    for (let deleteBtn of deleteButtons) {
        deleteBtn.addEventListener("click", async () => {
            const itemId = deleteBtn.dataset.itemId;

            const result = await fetch("/cart/remove-item", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    itemId,
                }),
            }).then((res) => res.json());

            if (result.success) {
                window.location.reload();
            }
        });
    }

    async function clearCart() {
        console.log("clicked");
        const res = await fetch("/cart", {
            method: "DELETE",
        });

        if (res.status == 200) {
            window.location.reload();
        }
    }

    const clearCartBtn = document.getElementById("clear-cart");
    clearCartBtn.addEventListener("click", async () => await clearCart());
};

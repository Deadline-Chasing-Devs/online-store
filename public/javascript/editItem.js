window.onload = function () {
    const removeItemBtn = document.getElementById("remove-btn");
    removeItemBtn.addEventListener("click", () => {
        const confirm = window.confirm(
            "Do you want to delete this item ? You can't undo this operation."
        );
        if (confirm) {
            fetch(window.location.href, {
                method: "DELETE",
            }).then(res => {
                if (res.status == 400) {
                    window.location.reload();
                } else if (res.status == 200) {
                    window.location.replace("/dashboard");
                }
            });
        }
    });
};

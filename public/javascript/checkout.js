window.onload = function() {
    const cancel = document.getElementById("cancel");
    cancel.addEventListener("click", () => {
        window.location.replace("/");
    });
};
window.onload = function() {
    const cancel = document.getElementById("cancel");
    cancel.addEventListener("click", () => {
        console.log("clicked");
        window.location.replace("/");
    });
};
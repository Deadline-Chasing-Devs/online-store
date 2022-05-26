window.onload = async function() {
    const searchClearButton = document.getElementById("search-clear-btn");
    const searchButton = document.getElementById("search-btn");

    searchClearButton.addEventListener("click", () => {
        location.reload();
    });

    searchButton.addEventListener("click", () => {
        const string = document.getElementById("search-text").value.toLowerCase();
        const customerNameElems = document.getElementsByClassName("customer-name");
        for (let i=0; i < customerNameElems.length; i++) {
            const row = customerNameElems[i].parentElement;
            row.style.display = "";
            const customerName = customerNameElems[i].textContent.toLowerCase();
            if (!customerName.includes(string)) {
                row.style.display = "none";
            }
        }
    });
};
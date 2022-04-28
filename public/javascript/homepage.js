let text = document.getElementById("text");
let btn = document.getElementById("btn");
let item2 = document.getElementById("item2");
let item1 = document.getElementById("item1");
window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);

    let value = window.scrollY;
    text.style.top = 40 + value * -0.5 + "%";
    btn.style.marginTop = value * 1.5 + "px";
    item2.style.top = value * 0.25 + "px";
    item1.style.top = value * 0.25 + "px";
});

var popupViews = document.querySelectorAll(".popup-view");
var popupBtns = document.querySelectorAll(".popup-btn");
var closeBtns = document.querySelectorAll(".close-btn");

var popup = function (popupClick) {
    popupViews[popupClick].classList.add("active");

    document.body.style.overflowY = "hidden";
};

popupBtns.forEach((popupBtn, i) => {
    popupBtn.addEventListener("click", () => {
        popup(i);
    });
});

closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        popupViews.forEach((popupView) => {
            popupView.classList.remove("active");
            document.body.style.overflowY = "";
        });
    });
});
//rating popup start

var popupViews2 = document.querySelectorAll(".container-new");
var popupBtns2 = document.querySelectorAll(".popup-rate");
var closeBtns2 = document.querySelectorAll(".close-btn-rate");

var popup1 = function (popupClick) {
    popupViews2[popupClick].classList.add("active1");

    document.body.style.overflowY = "hidden";
};

popupBtns2.forEach((popupBtn, i) => {
    popupBtn.addEventListener("click", () => {
        popup1(i);
    });
});

closeBtns2.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
        popupViews2.forEach((popupView) => {
            popupView.classList.remove("active1");
        });
    });
});

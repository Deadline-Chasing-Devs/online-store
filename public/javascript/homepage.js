var popupViews = document.querySelectorAll(".popup-view");
var popupBtns = document.querySelectorAll(".popup-btn");
var closeBtns = document.querySelectorAll(".close-btn");

var popup = function(popupClick){
    popupViews[popupClick].classList.add("active");
};

popupBtns.forEach((popupBtn, i)=>{
    popupBtn.addEventListener("click", ()=>{
        popup(i);
    });
});
closeBtns.forEach((closeBtn)=>{
    closeBtn.addEventListener("click", ()=>{
        popupViews.forEach((popupView)=>{
            popupView.classList.remove("active");
        });
    });
});

function searchElement() {
    var input,txtvalue,products,div,i,h2;
    input = document.getElementById("pinput");
    console.log(input.value);
    fileter = input.value.toLowerCase();
    product = document.getElementsByTagName('li');
    console.log(product);

    for(i = 6; i < product.length; i++){
        h2 = product[i].getElementsByTagName("div")[0].getElementsByTagName("h2")[0];
        console.log(h2.innerText);
        txtvalue = h2.innerText;
        if(txtvalue.toLowerCase().indexOf(fileter) > -1){
            product[i].style.display = "";
        }else{
            product[i].style.display = "none";
        }
    }
}
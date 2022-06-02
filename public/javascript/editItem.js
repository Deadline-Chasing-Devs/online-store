let toDelList = [];
let toDelCover = [];
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

    //Check File API support
    if (window.File && window.FileList && window.FileReader) {
        var filesInput = document.getElementById("images");

        filesInput.addEventListener("change", function (event) {
            var files = event.target.files; //FileList object
            var output = document.getElementById("images-view");

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                //Only pics
                if (!file.type.match("image")) continue;

                var picReader = new FileReader();

                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;

                    var div = document.createElement("div");

                    div.className = "col-sm-3";

                    div.innerHTML =
                        "<img class='thumbnail col-sm-3' style='height : 200px; width : auto; background-size: cover; background-repeat: no-repeat; background-position:center;' src='" +
                        picFile.result +
                        "'" +
                        "title='" +
                        picFile.name +
                        "'/>";

                    output.insertBefore(div, null);
                });

                //Read the image
                picReader.readAsDataURL(file);
            }
        });
    } else {
        console.log("Your browser does not support File API");
    }
};

function showCoverPhoto(event,itemId) {
    if (event.target.files.length == 1 && event.target.files[0].type.match("image")) {
        let src = URL.createObjectURL(event.target.files[0]);
        let preview = document.getElementById("cover-photo-view");
        preview.src = src;
        preview.style.display = "block";
        document.getElementById("remove-imgcover").outerHTML = "<button id=\"remove-imgcover\" type=\"button\" class=\"btn btn-success btn-circle\" onclick=\"refresh('"+itemId+"')\"><i class=\"fa-solid fa-arrows-rotate\"></i></button>";
    }
}

function deleteCover(coverId){
    document.getElementById(coverId).outerHTML = "";
    toDelCover.push(coverId);  
}

function addToDelete(image){
    document.getElementById(image).outerHTML = "";
    toDelList.push(image);
    
}

function postValues(){
    document.getElementById("delArray").value = JSON.stringify(toDelList);
    document.getElementById("deleteCoverPhoto").value = JSON.stringify(toDelCover);
    const cover = document.getElementById("cover-files");
    const preview = document.getElementById("images");
    document.getElementById("newCoverCount").value = cover.files.length;
    document.getElementById("newPreviewCount").value = preview.files.length;
    console.log(cover.files.length, preview.files.length);
}

function discard(){
    window.location.href = "/dashboard";
}

function refresh(itemId){
    console.log(itemId);
    window.location.href = "/edit-item/" + itemId;
}
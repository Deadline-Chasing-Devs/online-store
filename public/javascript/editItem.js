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
            document.getElementById("upload-preview").outerHTML = "<button id=\"remove-imgcover\" type=\"button\" class=\"btn btn-success btn-circle preview-Upload-Reset\" onclick=\"refresh()\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Reset\"><i class=\"fa-solid fa-arrows-rotate\"></i></button>";
            output.innerHTML = "";
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                //Only pics
                if (!file.type.match("image")) continue;
                var picReader = new FileReader();
                picReader.addEventListener("load", function (event) {
                    var picFile = event.target;
                    var div = document.createElement("div");
                    div.className = "card vendor-item-image";
                    div.innerHTML = "";
                    div.innerHTML =
                        "<img class='' min-width=\"250px\" height=\"auto\" src='" +
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

function showCoverPhoto(event) {
    if (event.target.files.length == 1 && event.target.files[0].type.match("image")) {
        let src = URL.createObjectURL(event.target.files[0]);
        let preview = document.getElementById("cover-photo-view");
        preview.src = src;
        preview.style.display = "block";
        document.getElementById("remove-imgcover").outerHTML = "<button id=\"remove-imgcover\" type=\"button\" class=\"btn btn-success btn-circle\" onclick=\"refresh()\" data-bs-toggle=\"tooltip\" data-bs-placement=\"top\" title=\"Reset\"><i class=\"fa-solid fa-arrows-rotate\"></i></button>";
    }
}

function deleteCover(coverId){
    document.getElementById(coverId).outerHTML = "";
    toDelCover.push(coverId);  // push cover image to deletedcover list
}

function addToDelete(image){
    document.getElementById(image).outerHTML = "";
    toDelList.push(image); // push image id to deleted list
    
}

function postValues(){
    document.getElementById("delArray").value = JSON.stringify(toDelList); // Ids of delete preview photos
    document.getElementById("deleteCoverPhoto").value = JSON.stringify(toDelCover); // Id of coverphoto If deleted
    const cover = document.getElementById("cover-files");
    const preview = document.getElementById("images");
    document.getElementById("newCoverCount").value = cover.files.length; // no  of uploaded cover images (max = 1)
    document.getElementById("newPreviewCount").value = preview.files.length; // no of uploaded preview images (0 - 3)
}

function discard(){
    window.location.href = "/dashboard";
}

function refresh(){
    location.reload();
}

const input = document.querySelector("#images");

// Listen for files selection
input.addEventListener("change", (e) => {
    // Retrieve all files
    const files = input.files;
    const delCount = toDelList.length;
    var maxAllowed = parseInt(initialImg) + files.length - delCount;
    // Check files count
    if (maxAllowed > 3) {
        alert("Image limit exceeded!");
        location.reload();
    }
});
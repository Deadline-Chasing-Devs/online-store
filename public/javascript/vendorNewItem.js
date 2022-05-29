window.onload = function () {
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

function showCoverPhoto(event) {
    if (event.target.files.length == 1 && event.target.files[0].type.match("image")) {
        let src = URL.createObjectURL(event.target.files[0]);
        let preview = document.getElementById("cover-photo-view");
        preview.src = src;
        preview.style.display = "block";
    }
}

function clearForm() {
    document.getElementById("new-item-form").reset();
    document.getElementById("cover-photo-view").setAttribute("src", "");
    document.getElementById("images-view").innerHTML = "";
}

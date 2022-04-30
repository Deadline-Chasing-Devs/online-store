var side_bar = document.querySelector(".dashboard-sidebar-container");
var sub_division = document.querySelector(".sub-division"); 
var toggle_button = document.querySelector(".dashboard-toggle-icon");
var user_credentials = document.querySelector(".dashboard-user-credentials");

//for minimizing the side banner
toggle_button.onclick = function(){
    let class_Name = side_bar.className;
    if(sub_division.className == "sub-division"){
        sub_division.className = "sub-division division-maximized";
      
    }else{
        sub_division.className = "sub-division";
      
    }

    
    if (class_Name.includes("side-minimized")) {
        side_bar.className = "dashboard-sidebar-container";
        user_credentials.className = "dashboard-user-credentials";
    } else {
        side_bar.className = "dashboard-sidebar-container side-minimized";
        user_credentials.className = "dashboard-user-credentials dashboard-user-credentials-shrink";

    }
    
};

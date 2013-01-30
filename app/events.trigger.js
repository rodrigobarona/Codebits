Lungo.ready(function() {
    
    // If don't have token, show login page
    var mi_token = Lungo.Data.Storage.persistent("user_token");
    if (! mi_token) {
        
        Lungo.Router.section("login");
    } else {  

        var get_skill = '';
        Lungo.Data.Cache.set("skill", get_skill);
        Lungo.Core.execute(get_users);
        
    }



    // If is mobile, add Pull&Refresh
    var mobile = Lungo.Core.isMobile(); 
    var screenWidth = window.screen.width;
    if (mobile == true) {  //We are on Mobile Device
       
        if (screenWidth <= '480') { //It a Phone
           // alert('Phone') 
        } else {  // Its a Tablet
           // alert('Tablet') 
        };

    } else { // We are on Desktop Machine
        // alert('Desktop')
    };

});
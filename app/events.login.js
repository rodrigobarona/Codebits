Lungo.Events.init({
	// Login
   'tap section#login form a' : function() {
        Lungo.Core.execute(requestToken);
    },

    // Logout
   'tap aside#features article a[data-action]' : function() {
         Lungo.Data.Storage.persistent("user_token", null );
         Lungo.View.Aside.hide();
         Lungo.Router.section("login");
         Lungo.Notification.success('Session closed', 'You are log-out now...', 'lock', 3);
         
    }

});
    
    // Login with keyboard submit
    $$('#loginForm input').on("submit", "input", function() {
        Lungo.Core.execute(requestToken);   
     });


    // Autofill user name on login
    $$('#login').ready(function() {
        loginUser = Lungo.Data.Storage.persistent("signup-name");

        if(loginUser == null) {
          
        } else {
          $$('#signup-name').attr('value', loginUser);
        }
  
    });


///////////////////////////////////////////////////////////////////////////
// Request Token from LOGIN
///////////////////////////////////////////////////////////////////////////

    var requestToken = function () {
    var loginUser = $$('#signup-name').val(); 
    var loginPass = $$('#signup-password').val();
    Lungo.Data.Storage.persistent("signup-name",loginUser);

    $$.ajax({
            type: 'GET', 
            url: 'https://services.sapo.pt/Codebits/gettoken?user=' + loginUser + '&password=' + loginPass +'&callback=?',
            dataType: 'json', 
            async: true,
            success: function(data) { 
              if( typeof(data.error) == 'undefined' ){
                Lungo.Data.Storage.persistent("user_token",data.token);
                var mi_token = Lungo.Data.Storage.persistent("user_token");

                Lungo.Router.back();
                $$('#search-box').val('');
                Lungo.Core.execute(get_users);
                  
                
              } else {

                if (data.error.msg == 'auth failed' ) {
                  Lungo.Notification.error('Access denied', 'Your user or password are incorrect', 'warning', 5);
                } else {
                  Lungo.Notification.error('Connection Error', 'Try it again in few minutes...', 'cancel', 5);
                }  
              } 
            }
       
        });

    };

   // Show Friends Tab form de User Details
   $$('section#details nav a:nth-child(3)').tap (function() {
        Lungo.Core.execute(get_user_sesions);        
    });



///////////////////////////////////////////////////////////////////////////
// Show User Details - Friends
///////////////////////////////////////////////////////////////////////////
    
       var get_user_sesions = function ()  {
            $$('section#details article#user-sessions ul').html('<li data-loading="black"><div class="loading black"></div></li>');
            Lungo.Element.loading("section#details article#user-sessions ul .loading", "black");
            var userID = Lungo.Data.Cache.get("user_id");
            var mi_token = Lungo.Data.Storage.persistent("user_token");
            $$.ajax({
                type: 'GET', // defaults to 'GET'
                url: 'https://services.sapo.pt/Codebits/usersessions/' + userID + '?token=' + mi_token + '&callback=?',
                data: {},
                dataType: 'json', //'json', 'xml', 'html', or 'text'
                async: true,
                success: function(data) { 
                if( typeof(data.error) == 'undefined' ){

                  var language = '';
                  var number = data.length;  
                  var output="<li class='anchor'>"+ number +" favourite sessions</li>";
                  for (var i in data) {
                      
                      if( data[i].lang  == 'en' ) {
                        language = 'English';
                      } else if (data[i].lang  == 'pt'){ 
                        language = 'Portuguese';
                      } else {
                        language = data[i].lang;
                      }
                      
                      output+="<li class='secondary'>";
                      output+="<div class='right tag theme' data-icon='microphone'>" + language + "</div>";
                      output+="<strong>" + data[i].title + "</strong>";
                      output+="<small><span class='icon pushpin'></span> " + data[i].place + "</small>";
                      output+="<small><span class='icon clock'></span> " + data[i].start + "</small>";
      
                      
                      output+="</li>";
                      }

                    
                   
                    $$('section#details article#user-sessions ul').html(output);
                    

                } else {
                  Lungo.Router.section("login");
                  Lungo.Notification.error('Session expired', 'You have to login again', 'warning', true, 5);
                  
                } 

                }

            });

       } 

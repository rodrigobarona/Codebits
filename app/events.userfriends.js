   // Show Friends Tab form de User Details
   $$('section#details nav a:nth-child(2)').tap (function() {
        Lungo.Core.execute(get_user_friends);        
    });

    // Open User Details
    $$('section#details article#user-friends a[data-id]').tap (function() {
        Lungo.Data.Cache.remove("user_id");
        var get_user_id = $$(this).attr("data-id");
        Lungo.Data.Cache.set("user_id", get_user_id);
        Lungo.Core.execute(get_user_details); 
   });



///////////////////////////////////////////////////////////////////////////
// Show User Details - Friends
///////////////////////////////////////////////////////////////////////////
    
       var get_user_friends = function ()  {
            $$('section#details article#user-friends ul').html('<li data-loading="black"><div class="loading black"></div></li>');
            Lungo.Element.loading("section#details article#user-friends ul .loading", "black");
            var userID = Lungo.Data.Cache.get("user_id");
            var mi_token = Lungo.Data.Storage.persistent("user_token");
            $$.ajax({
                type: 'GET', // defaults to 'GET'
                url: 'https://services.sapo.pt/Codebits/foaf/' + userID + '?token=' + mi_token + '&callback=?',
                data: {},
                dataType: 'json', //'json', 'xml', 'html', or 'text'
                async: true,
                success: function(data) { 
                if( typeof(data.error) == 'undefined' ){
                  
                  var number = data.length;  
                  var output="<li class='anchor'>"+ number +" friends</li>";
                  for (var i in data) {
                      
                      output+="<li class='thumb selectable arrow'>";
                      output+="<img src='https://secure.gravatar.com/avatar/" + data[i].md5mail + ".jpg?d=retro&s=53' class='icon arrow'  >";
                      output+="<a href='#user-info' data-router='article' data-id="+ data[i].id + "><strong>" + data[i].name + "</strong>";
                      if( data[i].twitter.length <= 0 ) {
                          output+="<small>&nbsp;</small>";
                      } else { 
                        output+="<small>@" + data[i].twitter + " </small>";
                      }
                      
                      output+="</a></li>";
                      }

                    
                    $$('section#details article#user-friends ul').html(output);
                    

                } else {
                  Lungo.Router.section("login");
                  Lungo.Notification.error('Session expired', 'You have to login again', 'warning', true, 5);
                  
                } 

                }

            });

       } 

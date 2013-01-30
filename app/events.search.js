   // Search by user
   $$('#searchUsers').on("submit", "#searchUsers", function() {
        Lungo.Core.execute(search_by_user);    
   });


    // Show / Hide Search box
    Lungo.dom('[data-action=search]').tap(function(event) {
        $$('#user-list form').toggleClass('hide');
        $$('#searchUsers').trigger('select');
    });



///////////////////////////////////////////////////////////////////////////
// Search by name
///////////////////////////////////////////////////////////////////////////

     var search_by_user = function ()  {

          var sectionTitle = 'Search results'
          $$('section#main header ').data('title', sectionTitle);
          $$('section#main header .title').text(sectionTitle);
          $$('section#main article ul').html('<li data-loading="black"><div class="loading black"></div></li>');
          Lungo.Element.loading("section#main article ul .loading", "black");

          var userName = $$('#search-box').val();
          var mi_token = Lungo.Data.Storage.persistent("user_token");
          
          $$.ajax({
              type: 'GET', // defaults to 'GET'
              url: 'https://services.sapo.pt/Codebits/search/' + userName + '?token=' + mi_token + '&callback=?',
              data: {},
              dataType: 'json', //'json', 'xml', 'html', or 'text'
              async: true,
              success: function(data) { 

              if( typeof(data.error) == 'undefined' || !userName  ){
                 
                  var number = '';
                  var avatar = '';   

                  if (data.result == '-1' || !userName ) {   //no results
                      number = '0'; 
                      avatar = 'mm';
                      md5mail = '00000000000000000000000000000000'; 
                      name = 'No user found!';
                      twitter = 'Try again with keywords'

                      var output="<li class='anchor'>"+ number +" participants</li>";
                        output+="<li class='thumb selectable'>";
                        output+="<img src='https://secure.gravatar.com/avatar/" + md5mail + ".jpg?d=" + avatar + "&s=53' class='icon' >";
                        output+="<a href='#'><strong>" + name + "</strong><small>" + twitter + " </small></a></li>";

                     $$('section#main article ul').html(output);   

                    } else {
                      number = data.length; 
                      avatar = 'retro';  
                    
                    var output="<li class='anchor'>"+ number +" participants</li>";
                    for (var i in data) {
                        output+="<li class='thumb selectable arrow'>";
                        output+="<img src='https://secure.gravatar.com/avatar/" + data[i].md5mail + ".jpg?d=" + avatar + "&s=53' class='icon' >";
                        output+="<a href='#details' data-router='section' data-async='app/sections/userdetails.html' data-id="+ data[i].id + "><strong>" + data[i].name + "</strong>";
                        output+="<small>" + data[i].nick + " </small>";                      
                        output+="</a></li>";
                        
                    }  
                  
                  
                  $$('section#main article ul').html(output);

                  }
                  

              } else {
                Lungo.Router.section("login");
                Lungo.Notification.error('Session expired', 'You have to login again', 'message', true, 5);
                
              } 

              }

          });

     } 

Lungo.Events.init({
    
   // Filter Skill from menu
   'tap aside#features article a[data-skill]' : function() {
        
        Lungo.Data.Cache.remove("skill");
        $$('#search-box').val('');
        $$(this).parent().siblings('li.menu-skill').removeClass('active');

        $$(this).parent().addClass('active');
        var sectionTitle = $$(this).data('title');
        $$('section#main header ').data('title', sectionTitle);
        $$('section#main header .title').text(sectionTitle);
        var get_skill = $$(this).attr("data-skill");
        Lungo.Data.Cache.set("skill", get_skill);
        Lungo.Core.execute(get_users); 
        
   }

});

///////////////////////////////////////////////////////////////////////////
// Get User list from Codebits API
///////////////////////////////////////////////////////////////////////////
    
       var get_users = function ()  {
            $$('section#main article ul').html('<li data-loading="black"><div class="loading black"></div></li>');
            Lungo.Element.loading("section#main article ul .loading", "black");

            var skill = Lungo.Data.Cache.get("skill");
            if( typeof(skill) == 'undefined' ){
              skill = '';
            }
            var mi_token = Lungo.Data.Storage.persistent("user_token");
            $$.ajax({
                type: 'GET', // defaults to 'GET'
                url: 'https://services.sapo.pt/Codebits/users/' + skill + '?token=' + mi_token + '&callback=?',
                data: {},
                dataType: 'json', //'json', 'xml', 'html', or 'text'
                async: true,
                success: function(data) { 

                if( typeof(data.error) == 'undefined' ){
                  
                  var number = data.length;  
                  var output="<li class='anchor'>"+ number +" participants</li>";
                  for (var i in data) {
                      
                      output+="<li class='thumb selectable arrow'>";
                      output+="<img src='https://secure.gravatar.com/avatar/" + data[i].md5mail + ".jpg?d=retro&s=53' class='icon arrow'  >";
                      output+="<a href='#details' data-router='section' data-id="+ data[i].id + " data-async='app/sections/userdetails.html' ><strong>" + data[i].name + "</strong>";
                      if( data[i].twitter.length <= 0 ) {
                          output+="<small>&nbsp;</small>";
                      } else { 
                        output+="<small>@" + data[i].twitter + " </small>";
                      }
                      
                      output+="</a></li>";
                      }

                                       
                    $$('section#main article ul').html(output);
                    

                } else {
                  Lungo.Router.section("login");
                  Lungo.Notification.error('Session expired', 'You have to login again', 'warning', true, 5);
                  
                } 

                }

            });

       }   

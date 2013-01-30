   // Open User Details
    $$('section#main article a[data-id]').tap (function() {

        Lungo.Data.Cache.remove("user_id");
        var get_user_id = $$(this).attr("data-id");
        Lungo.Data.Cache.set("user_id", get_user_id);
        Lungo.Core.execute(get_user_details); 
   });






///////////////////////////////////////////////////////////////////////////
// Show User Details - Profile
///////////////////////////////////////////////////////////////////////////

       var get_user_details = function ()  {
            $$('section#details article#user-info ul').html('<li data-loading="black"><div class="loading black"></div></li>');
            Lungo.Element.loading("section#details#user-info article ul .loading", "black");

            var userID = Lungo.Data.Cache.get("user_id");
            if( typeof(skill) == 'undefined' ){
              skill = '';
            }

            var mi_token = Lungo.Data.Storage.persistent("user_token");
            $$.ajax({
                type: 'GET', // defaults to 'GET'
                url: 'https://services.sapo.pt/Codebits/user/' + userID + '?token=' + mi_token + '&callback=?',
                data: {},
                dataType: 'json', //'json', 'xml', 'html', or 'text'
                async: true,
                success: function(data) { 
                console.log(data);
                console.log(data.twitter);
                console.log(data.coderep);
                 console.log(data.badges);
                if( typeof(data.error) == 'undefined' ){

                  var sectionUser = data.name;
                  $$('section#details header ').data('title', sectionUser);
                  $$('section#details header .title').text(sectionUser);

                 
                  var output="<li><div class='row'><div class='three columns'><img src='https://secure.gravatar.com/avatar/" + data.md5mail + ".jpg?d=retro&s=200' ></div><div class='seven columns'><strong>"+ data.name +"</strong><p>Nick: "+ data.nick +"<br />Karma: "+ data.karma +"<br />Last login: "+ data.checkin_date +"</p></div></div></li>";
                 
                  if( data.twitter !== '' && !data.coderep && !data.blog ) { //Only Twitter
                   output+="<div class='one row'><a href='http://twitter.com/"+ data.twitter + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand twitter'></span> Follow @"+ data.twitter + "</a></div>"; 
                  } else if ( !data.twitter && data.coderep !=='' && !data.blog ) { //Only Repository
                    output+="<div class='one row'><a href='"+ data.coderep + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand branch'></span> Code Repository</a></div>";
                  } else if ( !data.twitter && !data.coderep  && data.blog !=='' ) { //Only Blog
                     output+="<div class='one row'><a href='"+ data.blog + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand feed'></span> My Blog</a></div>";
                  } else if (data.twitter !== '' && data.coderep !=='' && !data.blog ) { //Twitter + Repository
                    output+="<div class='row'><div class='col5 columns '><a href='http://twitter.com/"+ data.twitter + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand twitter'></span> @"+ data.twitter + "</a></div>"; 
                    output+="<div class='col5 columns '><a href='"+ data.coderep + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand branch'></span> Code Repository</a></div></div>";
                  } else if (data.twitter !== '' && !data.coderep && data.blog !='' ) { //Twitter + Blog
                    output+="<div class='row'><div class='col5 columns '><a href='http://twitter.com/"+ data.twitter + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand twitter'></span> @"+ data.twitter + "</a></div>"; 
                    output+="<div class='col5 columns '><a href='"+ data.blog + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand feed'></span> My Blog</a></div></div>";
                  } else if (!data.twitter && data.coderep !='' && data.blog !='' ) { //Repository + Blog
                    output+="<div class='row'><div class='col5 columns '><a href='"+ data.coderep + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand branch'></span> Code Repository</a></div>"; 
                    output+="<div class='col5 columns '><a href='"+ data.blog + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand feed'></span> My Blog</a></div></div>";
                  } else if (data.twitter !='' && data.coderep !='' && data.blog !='' ) { //Twitter + Repository + Blog
                    output+="<div class='row'><div class='col3 columns '><a href='http://twitter.com/"+ data.twitter + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand twitter'></span> Follow</a></div>"; 
                    output+="<div class='col3 columns '><a href='"+ data.coderep + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand branch'></span> Code</a></div>";
                    output+="<div class='col3 columns '><a href='"+ data.blog + "' target='_blank' class='button small anchor theme margin bottom' ><span class='icon brand feed'></span> Blog</a></div></div>";

                  }
                    

                  

                  output+="<li class='anchor'>Biography</li><li class='feature'><pre class='feature'>"+data.bio+"</pre></li>";

                  // Get Skills
                  var mySkills = data.skills;  
                  output+="<li class='anchor'>Skills</li><li class='feature'>";
                  for (var i in mySkills) {
                      output+="<div class='tag theme'>" + mySkills[i] + "</div>&nbsp;";
                  }
                  output+="</li>";

                  // Get Badges
                  var myBadges = data.badges;  
                  output+="<li class='anchor'>Badges</li><li class='feature badges'>";
                  for (var i in myBadges) {

                    if (myBadges[i] == '95' ){
                      output+="<img src='http://codebits.eu/imgs/b/0_normal.png' >";
                    } else {
                      output+="<img src='https://codebits.eu/imgs/b/2012/" + myBadges[i] + "_normal.png' >";
                    }
                      
                  }
                  output+="</li>";

                    
                       
                    
                    $$('section#details article#user-info ul').html(output);
                    

                } else {
                  Lungo.Router.section("login");
                  Lungo.Notification.error('Session expired', 'You have to login again', 'warning', true, 5);
                  
                } 

                }

            });

       } 

Lungo.Events.init({

   //Show Aside Menu
   'swipeRight section#main' : function() {
      Lungo.View.Aside.show("#features");
   },
   //Hide Aside Menu
   'swipeLeft section#main' : function() {
      Lungo.View.Aside.hide();
   }

});
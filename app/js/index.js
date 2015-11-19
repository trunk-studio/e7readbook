
var myApp = new Framework7({
    modalTitle: 'Framework7',
    animateNavBackIcon: true,
    template7Pages: true,
    pushState: true,
    swipeBackPage: false,
    init: false
});

// Expose Internal DOM library
var $$ = Dom7;

$$(document).on('pageInit', '.page[data-page="index"]', function (e) {
  $$.ajax({
    url: "/user/loginStatus",
    type:"GET",
    success: function(result){
      if(JSON.parse(result)){
        $$("#mainMenu").show();
        $$(".notSigned").hide();
        $$(".signed").show();
      }else{
        $$("#mainMenu").show();
        $$(".notSigned").show();
        $$(".signed").hide();
      }
    }
  });


  $$("#signOutBtn").click(function() {
    $$.ajax({
      url: "/user/signOut",
      type:"GET",
      success: function(result){
        myApp.addNotification({
          title: '登出成功',
          hold: 2000
        });
        $$(".notSigned").show();
        $$(".signed").hide();
      }
    });
  })

})

myApp.init();

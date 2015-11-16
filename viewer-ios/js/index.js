
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
})

myApp.init();

$$("#signOutBtn").click(function() {
    myApp.alert("!!!");
})

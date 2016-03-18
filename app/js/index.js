
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
  setTimeout(function() {
    $$('#splash').addClass('animated fadeOut');
    setTimeout(function() {
      $$('#splash').hide();
    }, 650);
  }, 500);
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

  $$.ajax({
    url: "/siteProfile",
    type:"GET",
    dataType: 'json',
    success: function(result){
      if(result.competence){
        $$('#siteName').text(result.site.name);
        // $$('#siteProfileLoginPageHtml').text(result.profile.LoginPageHtml);
        if(result.profile.ViewerLoginImageUrl != "")
        $$('#siteProfileViewerLoginImageUrl').attr('src', result.domain + '/images/' +result.profile.ViewerLoginImageUrl);
        else{
          $$('#siteProfileViewerLoginImageUrl').remove();
        }
      }else{
        window.location.replace(result.domain);
      }
    }
  });


  $$("#signOutBtn").click(function() {
    myApp.confirm('確定登出當前帳號?', '登出', function () {
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
   });
  })

  $$("#forgetPasswordBtn").click(function() {
    myApp.prompt('請輸入您的email','忘記密碼' ,function (value) {
      if(!validateEmail(value)){
        myApp.alert("請輸入email","錯誤");
        return;
      }
      $$.ajax({
        url: "/forgotPassword",
        type:"GET",
        data : {
          email: value
        },
        success: function(result){
          myApp.alert("已把重置密碼信件，寄送到您的信箱","已確認");
        },
        error:function(xhr, ajaxOptions, thrownError){
          myApp.alert("找不到此用戶","錯誤");
        }
      });
    });
  })

  function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

})

myApp.init();

// var $$ = Dom7;
$$('#login-form').on('submitted', function (e) {
  var xhr = e.detail.xhr; // actual XHR object
  var data = JSON.parse(e.detail.data);
  if(data.status == 'ok'){
    myApp.closeModal($$(".login-screen"));
    myApp.addNotification({
      title: '登入成功',
      hold: 2000
    });
    $$("input[name='password']").val('');
    $$("input[name='identifier']").val('')
    $$(".notSigned").hide();
    $$(".signed").show();
  }else if(data.status == 'first'){
    myApp.closeModal($$(".login-screen"));
    myApp.alert("第一次登入記得更改密碼喔","警告")
    myApp.addNotification({
      title: '登入成功',
      hold: 2000
    });
    $$("input[name='password']").val('');
    $$("input[name='identifier']").val('')
    $$(".notSigned").hide();
    $$(".signed").show();
  }else{
    myApp.alert('請再次確認帳號密碼喔','錯誤');
  }
});

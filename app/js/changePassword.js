$$(document).on('pageInit', '.page[data-page="changePassword"]', function (e) {

  $$('#changePassword-form').on('submitted', function (e) {
    var xhr = e.detail.xhr; // actual XHR object
    var data = JSON.parse(e.detail.data);
    if(data.status == 'ok'){
      mainView.router.back();
      myApp.addNotification({
        title: '更改成功',
        hold: 2000
      });
      $$(".notSigned").hide();
      $$(".signed").show();
    }else{
      myApp.alert('請再次確認密碼喔','錯誤');
    }
  });

  $$('#changePassword-form').on('submitError', function (e) {
    myApp.alert('請再次確認密碼喔','錯誤');
  });

});

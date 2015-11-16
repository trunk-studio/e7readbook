$$(document).on('pageInit', '.page[data-page="changePassword"]', function (e) {
  
  $$('#changePassword-form').on('submitted', function (e) {
    var xhr = e.detail.xhr; // actual XHR object
    var data = JSON.parse(e.detail.data);
    console.log(data);
    if(data.status == 'ok'){
      myApp.addNotification({
        title: '更改成功',
        hold: 2000
      });
      $$(".notSigned").hide();
      $$(".signed").show();
    }else{
      myApp.alert('請再次確認密碼喔');
    }
  });

  $$('#changePassword-form').on('submitError', function (e) {
    console.log(e);
    myApp.alert('請再次確認密碼喔');
  });

});

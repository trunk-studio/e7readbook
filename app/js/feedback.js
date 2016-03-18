$$(document).on('pageInit', '.page[data-page="feedback"]', function (e) {
  $$('#feedback-form').on('submitted', function (e) {
    var xhr = e.detail.xhr; // actual XHR object
    var data = e.detail.data;
    if(data == 'PRINYAL'){
      mainView.router.back();
      myApp.addNotification({
        title: '回報成功',
        hold: 2000
      });
    }else{
      myApp.alert('請輸入完全喔','錯誤');
    }
  });

  $$('#feedback-form').on('submitError', function (e) {
    myApp.alert('請輸入完全喔','錯誤');
  });

});

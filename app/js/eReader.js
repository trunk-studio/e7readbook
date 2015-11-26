
$$(document).on('pageInit', '.page[data-page="book"]', function (e) {

  $$('#openBook').click(function(){
    var id = $$("#openBook").attr('data-id');
    var totalPageNumber = $$("#openBook").attr('data-totalPageNumber');
    var openUrl = "/ereader?id="+ id +"&name=APPLE&pages="+ totalPageNumber +"&loc=/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s&uuid=a1tw-32sd-23dfs-3f24-sdff-fs3s";
    var bookPages = [];
    $$.ajax({
      url: openUrl,
      type:"GET",
      success: function(result){
        console.log(JSON.parse(result));
        var bookDate = JSON.parse(result);
        if(bookDate.pageTotal == 0){
          myApp.alert("書本沒有資料喔",'錯誤');
          return ;
        }
        bookDate.pages.forEach(function(book){
          bookPages.push(book.url);
        });
        var myPhotoBrowserStandalone = myApp.photoBrowser({
          photos : bookPages,
          swipeToClose: false,
          expositionHideCaptions: true,
          lazyLoading: true,
          lazyLoadingInPrevNext: true,
          lazyLoadingOnTransitionStart: true
        });
        myPhotoBrowserStandalone.open();
      }
    });
  });

});

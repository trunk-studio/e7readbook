
$$(document).on('pageInit', '.page[data-page="book"]', function (e) {

  $$('#openBook').click(function(){
    var bookPages = [];
    $$.ajax({
      url: $$("#openBook").attr('data-url'),
      type:"GET",
      success: function(result){
        console.log(JSON.parse(result));
        var bookDate = JSON.parse(result);
        bookDate.pages.forEach(function(book){
          bookPages.push(bookDate.domain + book.url);
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

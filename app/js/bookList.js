$$(document).on('pageInit', '.page[data-page="bookList"]', function (e) {
  myApp.showPreloader('書籍清單載入中')
  $$.ajax({
    url: "/books",
    type:"POST",
    dataType: 'json',
    success: function(result){
      var books = result;
      console.log(books);
      showBookList(books);
      myApp.hidePreloader();
      $$('#bookListLength').text(books.length+" 本書");
    },
    error:function(xhr, ajaxOptions, thrownError){
      myApp.hidePreloader();
      window.location.href = 'index.html'
      // myApp.alert(xhr.status);
      // myApp.alert(thrownError);
    }
  });

  $$(document).on('click', '#bookListUl .item-content', function(){
    var id = $$(this).attr('data-id');
    var totalPageNumber = $$(this).attr('data-totalPageNumber');
    var openUrl = "/ereader?id="+ id +"&name=APPLE&pages="+ totalPageNumber +"&loc=/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s&uuid=a1tw-32sd-23dfs-3f24-sdff-fs3s";
    var bookPages = [];
    $$.ajax({
      url: openUrl,
      type:"GET",
      dataType: 'json',
      success: function(result){
        var bookDate = result;
        if(bookDate.pageTotal == 0){
          myApp.alert("書本沒有資料喔",'錯誤');
          return ;
        }
        bookDate.pages.forEach(function(book){
          bookPages.push(book.url);
        });
        if($$(".photo-browser").length == 0 ){
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
      }
    });
  });

})

function showBookList(data){
  var bookListTemplate = $$('script#booklist').html();
  var compiledBookListTemplate = Template7.compile(bookListTemplate);
  myApp.template7Data.bookInfo = data ;
  $$('#bookListUl').html(compiledBookListTemplate(data));
}

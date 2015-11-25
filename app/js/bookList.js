$$(document).on('pageInit', '.page[data-page="bookList"]', function (e) {
  myApp.showPreloader('書籍清單載入中')
  $$.ajax({
    url: "/books",
    type:"POST",
    success: function(result){
      var books = JSON.parse(result);
      console.log(books);
      showBookList(books);
      myApp.hidePreloader();
      $$('#bookListLength').text(books.length+" 本書");
    },
    error:function(xhr, ajaxOptions, thrownError){
      myApp.alert(xhr.status);
      myApp.alert(thrownError);
    }
  });
})


function showBookList(data){
  var bookListTemplate = $$('script#booklist').html();
  var compiledBookListTemplate = Template7.compile(bookListTemplate);
  myApp.template7Data.bookInfo = data ;
  $$('#bookListUl').html(compiledBookListTemplate(data));
}

$$(document).on('pageInit', '.page[data-page="bookList"]', function (e) {
  $$.ajax({
    url: "/books",
    type:"POST",
    success: function(result){
      console.log(JSON.parse(result));
      showBookList(JSON.parse(result));
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
  console.log(data);
  data[0].link = "/ereader?id="+ data[0].eBookGuid +"&name=APPLE&pages=100&loc=/a/1/a1tw-32sd-23dfs-3f24-sdff-fs3s&uuid=a1tw-32sd-23dfs-3f24-sdff-fs3s";
  myApp.template7Data.bookInfo = data ;
  $$('#bookListUl').html(compiledBookListTemplate(data));
}

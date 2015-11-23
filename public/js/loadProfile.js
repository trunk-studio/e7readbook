$(document).ready(function() {

  $.ajax({
    url: "/siteProfile",
    type:"GET",
    success: function(result){
      console.log(result)
      $(".navbar-header").loadTemplate($("#logoTpl"),{
            logo: result.ViewerLoginImageUrl
      });

      $("#description").loadTemplate($("#descriptionTpl"),{
            description: result.LoginPageHtml
      });

      $("#rightsDescription").loadTemplate($("#rightsDescriptionTpl"),{
            rightsDescription: result.RightsDescription
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log(xhr);
    }
  });
});

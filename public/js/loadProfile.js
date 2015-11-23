$(document).ready(function() {

  $.ajax({
    url: "/siteProfile",
    type:"GET",
    success: function(result){
      console.log(result)
      $(".navbar-header").loadTemplate($("#logoTpl"),{
            logo: result.domain+'/images'+result.profile.ViewerLoginImageUrl
      });

      $("#description").loadTemplate($("#descriptionTpl"),{
            description: result.profile.LoginPageHtml
      });

      $("#rightsDescription").loadTemplate($("#rightsDescriptionTpl"),{
            rightsDescription: result.profile.RightsDescription
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log(xhr);
    }
  });
});

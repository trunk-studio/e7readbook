$(document).ready(function() {

  $.ajax({
    url: "/siteProfile",
    type:"GET",
    success: function(result){
      console.log(result)
      if(result.profile.ViewerLoginImageUrl != ""){
        $(".navbar-header").loadTemplate($("#logoPicTpl"),{
            logo: result.domain+'/images'+result.profile.ViewerLoginImageUrl
        });
      }else{
        $(".navbar-header").loadTemplate($("#logoTextTpl"),{
            LogoText: result.site.name
        });
      }

      $("#description").loadTemplate($("#descriptionTpl"),{
            description: result.profile.LoginPageHtml
      });

      $("#rightsDescription").loadTemplate($("#rightsDescriptionTpl"),{
            rightsDescription: result.profile.RightsDescription.replace('%YEAR%',new Date().getFullYear())
      });
    },
    error:function(xhr, ajaxOptions, thrownError){
      console.log(xhr);
    }
  });
});

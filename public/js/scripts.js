$(document).ready(function() {

  // Smooth scrolling by clicking main menu sections
  $(".navbar-barnaul").find("a[href^='#']").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top-75}, 1000); // 1000 — scrolling delay in ms (1 second), you can change it to your value
  });

  // Smooth scrolling by clicking scroll-link href
  $("a[href^='#'].scroll-link").on('click', function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(this.hash).offset().top-75}, 1000);
  });

  // Fix & unfix navbar on top & body top_margin
  // On page load
  if ( $(document).width() < 768) {
    $('.navbar-barnaul').removeClass('navbar-fixed-top');
    $('body').css('margin-top','0');
  } else {
    $('.navbar-barnaul').addClass('navbar-fixed-top');
    $('body').css('margin-top','76px');
  }
  // On window resize
  $(window).resize(function() {
    if ( $(document).width() < 768) {
      $('.navbar-barnaul').removeClass('navbar-fixed-top');
      $('body').css('margin-top','0');
    } else {
      $('.navbar-barnaul').addClass('navbar-fixed-top');
      $('body').css('margin-top','76px');
    }
  });

  // Background images scrolling parallax
  $(window).stellar({ horizontalScrolling: false });

  // Feedback Form AJAX send
  $("#feedback-form").submit(function() {
    var str = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "assets/feedback.php",
      data: str,
      success: function(response) {
        if(response == 'PRINYAL') {
          // Success message
          result = '<div class="alert alert-success">Thank you! We will answer you soon!</div>';
          setTimeout("location.reload(true);",5000);
        } else {
          result = response;
        }
        $('#feedback_messages').html(result);
      }
    });
    return false;
  });

  // Feedback form validate
  $('#feedback-form').validate({
    rules: {
      name:       {required: true},
      email:      {required: true, email: true },
      message:    {required: true}
    },
    highlight: function(element) {
      $(element).closest('.form-group').removeClass('success').addClass('error');
    },
    success: function(element) {
      element
        .addClass('valid')
        .closest('.form-group').removeClass('error').addClass('success');
    }
  });

  // Newsletter form
  $("#newsletter-form").submit(function() {
    var str = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "assets/newsletter.php",
      data: str,
      success: function(response) {
        if(response == 'PRINYAL') {
          // Success Message
          result = '<div class="alert alert-success">Well done! You\'re singned up!</div>';
          setTimeout("location.reload(true);",5000);
        } else {
          result = response;
        }
        $('#newsletter-messages').html(result);
      }
    });
    return false;
  });

  // Fit Video
  $(".video-embedd").fitVids();
});
function intializedPage(){
$("#submitBtn").click(updateProject);
}

function updateProject(e) {
   var projectID = $('#project').val();
   $(projectID).animate({
      width: $('#width').val()
   });

   var newText = $('#description').val();
   $(projectID + " .project-description").text(newText);
}

$(document).ready(function(){

  /******** Navbar code ********/

  // Hamburger animation
  $('#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4').click(function(){
    $(this).toggleClass('open');
  });

  // Slide out animation
  $('.nav-toggle').on('click', function() {
    $('.main-navigation').toggleClass('open');
  });

  /******** index.handlebars code ********/

  // Scroll to div on homepage
  $('#home-tour').click(function(){
    // Subtract the navbarheight to scroll down properly
    var navbarOffset = 70;
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top - navbarOffset
    }, 500);
    return false;
  });
  
});

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
    var navbarOffset = 50;
    $('html, body').animate({
      scrollTop: $( $(this).attr('href') ).offset().top - navbarOffset
    }, 500);
    return false;
  });

  /******** studentpage.handlebars code ********/
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var curDate = new Date();

  // Fill the in the upcoming days
  var selectOptions = $('.studentpage-apt-select').children();
  for(var i=0; i<selectOptions.length; i++){
    // Value is month-date
    var val = curDate.getMonth()  + "/" + (curDate.getDate());
    var opt = selectOptions[i];
    opt.value = val;
    opt.innerHTML = days[curDate.getDay()];
    // Increment date
    curDate.setDate(curDate.getDate() + 1);
  }

  var $confirmationText = $('.studentpage-apt-confirm-time');
  var $studentPageSelect = $('.studentpage-apt-select');
  var $studentPageRadioButtons = $('input[name=radios]');
  // Set the default value for the confirmation text
  $confirmationText.text(formatConfirmationDate($studentPageSelect.val()) + " from " + $studentPageRadioButtons.val());

  // Listener to change confirmation time text from radio buttons
  $studentPageRadioButtons.change(function(){
    var newConfirmTime = formatConfirmationDate($studentPageSelect.val()) + " from " + $(this).val();
    $confirmationText.text(newConfirmTime);
  });

  // Listener to change confirmation time text from select
  $studentPageSelect.change(function(){
    var newConfirmTime =  formatConfirmationDate($(this).val()) + " from " + $('input[name=radios]:checked').val();
    $confirmationText.text(newConfirmTime);
  });



  $('.click-record').click(function(){
    	// your code here
    	ga("send", "event", "createaccount", "click");
      console.log('original');
    });

  $('#login-account-link').click(function(){
      	// your code here
      	ga("send", "event", "createaccount2", "click");
        console.log('1st');
      });
  $('.createaccount2_2nd').click(function(){
          	// your code here
        ga("send", "event", "createaccount2_2nd", "click");
        console.log('2nd');
          });

});

function formatConfirmationDate(text) {
  if(!text) return;
  var splitted = text.split("/");
  return (Number(splitted[0])+1) + "/" + splitted[1];
}

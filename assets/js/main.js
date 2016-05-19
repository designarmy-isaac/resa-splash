var inactive = true,
    gallerySettings = {
      slide: '.slide',
      infinite: false,
      autoplay: false,
      arrows: false,
      dots: true,
      speed: 600,
      cssEase: 'cubic-bezier(0.165, 0.840, 0.440, 1.000)',
      slidesToShow: 1,
      slidesToScroll: 1
    };

//- Show Content Bands
function showContent(sectionIndex) {
  //bring in content bands
  $('body').addClass('section-open');

  // set active section item
  $('.sections .band').removeClass('active peek');
  $('.sections').each(function() {
    $('.band', this).eq(sectionIndex).addClass('active');
  });

  // set active page content
  $('.pages .band .content').removeClass('active');
  $('.pages .band').each(function() {
    $('.content', this).eq(sectionIndex).addClass('active');
    
    // blank band
    if($('.content', this).eq(sectionIndex).hasClass('empty')) {
      $('.sections').each(function() {
        $('.band', this).eq(sectionIndex).addClass('peek');
      });
    }
    
    if($(window).width() < 768) {
      $('.gallery').slick('setPosition');
    }
  });
}

//-- Re-init/Destroy Galleries on Resize
function resizeFunc() {

  var winWidth = $(window).width();
  
  // re-init slides
  if(winWidth < 768 && inactive === true) {
    
    $('.gallery').slick(gallerySettings);
    inactive = false;
  
  } else if (winWidth > 767 && inactive === false) {
    
    $('.gallery').slick('unslick');
    inactive = true;

  }
}

//-- Loading Screen
$(window).load(function() {
  $('.loader').velocity({
    opacity: 0
  }, {
    delay: 800,
    complete: function() {
      $('body').addClass('loaded');
    }
  });
});

//-- On Resize
var resizeTimer;
$(window).on('resize', function() {

  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() { resizeFunc(); }, 250);

});

//-- Event Handlers
$(document).ready(function(){

  resizeFunc();

  $('a.section-link').on('click', function(e) {
    e.preventDefault();
    var sectionIndex = $(this).parent().index();

    // scroll to top if on mobile
    if($(window).width() < 768) {
      $('.header').velocity('scroll', {
        duration: 400,
        easing: 'easeInOutExpo',
        complete: function() {
          showContent(sectionIndex);
        }
      });
    } else {
      showContent(sectionIndex);
    }
  });

  $('#contact-form').validate({
    highlight: function(element, errorClass) {
      $(element).parent().addClass(errorClass);
    },
    unhighlight: function(element, errorClass) {
      $(element).parent().removeClass(errorClass);
    },
    submitHandler: function(form, event) {
      event.preventDefault();
      var submitText = $('#contact-form .btn').html();
      $('#contact-form .btn').html('Sending...');
      $.ajax({
        url: '/process.php',
        type: 'POST',
        data: $(form).serialize(),
        success: function(response) {
          if(response['Success'] === 0) {
            $('#contact-form .btn').html(submitText);

            $('#contact-form .btn').html('Error! Try again');

          } else if(response['Success'] === 1) {
            $('#contact-form').slideUp(1000, 'easeInOutExpo', function() {
              $('#contact-form input, #contact-form select').val('');
              $('#contact-form .btn').html(submitText);
              $('#success-msg').slideDown(700, 'easeInOutExpo');
            });
          }
        },
        error: function() {
          $('#contact-form .btn').html('Error! Try again');
        }
      })
      return false;
    },
    // all fields are required
    rules: {
      contact_name: {
        required: true,
      },
      contact_email: {
        required: true,
        email: true,
      },
      contact_phone: {
        required: true,
      }
    },
    messages: {
      contact_name: 'Required',
      contact_email: {
        required: 'Required',
        email: 'Must be valid email'
      },
      contact_phone: 'Required'
    }
  });

});
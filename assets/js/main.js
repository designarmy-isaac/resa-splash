function showContent(sectionIndex) {
  //bring in content bands
  $('body').addClass('section-open');

  // set active section item
  $('.sections .band').removeClass('active');
  $('.sections').each(function() {
    $('.band', this).eq(sectionIndex).addClass('active');
  });

  // set active page content
  $('.pages .band .content').removeClass('active');
  $('.pages .band').each(function() {
    $('.content', this).eq(sectionIndex).addClass('active');
  });
}

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
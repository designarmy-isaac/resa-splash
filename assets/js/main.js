$(window).load(function() {
  $('.loader').delay(800).velocity({
    opacity: 0
  }, {
    complete: function() {
      $('body').addClass('loaded');
    }
  });
});
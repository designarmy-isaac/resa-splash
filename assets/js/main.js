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
$(window).load(function() {
  $('.loader').velocity({
    opacity: 0
  }, {
    delay: 1000,
    complete: function() {
      $('body').addClass('loaded');
    }
  });
});
$(window).load(function() {
  setTimeout(function() {
    $('.loader').velocity({
      opacity: 0
    }, 400, function() {
      $('body').addClass('loaded');
    });
  }, 1000);
});
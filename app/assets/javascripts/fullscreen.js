$(window).load(function() {
  document.getElementById('fullscreen').addEventListener('click', function () {
      if (screenfull.enabled) {
          screenfull.toggle();
      } else {
          // Ignore or do something else
      }
    });
});

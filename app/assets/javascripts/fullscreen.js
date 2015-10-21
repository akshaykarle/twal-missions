$(window).load(function() {
  document.getElementById('fullscreen-btn').addEventListener('click', function () {
      if (screenfull.enabled) {
          screenfull.toggle();
      } else {
          // Ignore or do something else
      }
    });
});

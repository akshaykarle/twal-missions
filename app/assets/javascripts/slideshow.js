$(window).load(function() {
  var dashtagSlider = $('.flexslider').flexslider({
    animation: 'slide',
    animationLoop: false,
    pauseOnAction: false,
    slideshowSpeed: 5000,
    end: function(slider) {
      var lastPostId = slider.find('.slides li').last().data('post-id');
      $.get('/get_next_page?last_post_id=' + lastPostId, function(posts) {
        $.each(posts, addSlide);
      });
    },
    after: function(slider) {
      slider.pause();
      slider.play();
    }
  });

  var addSlide = function (index, post) {
    if (!post.media_url) {
      return;
    }
    var imgElement = $('<img>').attr('src', post.media_url);
    var textElement = $('<p>').html(post.text).attr('class', 'text');
    var authorElement = $('<a>').text("@"+post.screen_name+":").attr('href', post.profile_image_url).attr('class', 'author');
    var divElement = $('<div>').attr('class', 'post-data').append(authorElement).append(textElement);
    var liElement = $('<li>').attr('data-post-id', post.id).append(imgElement).append(divElement);
    dashtagSlider.data('flexslider').addSlide(liElement);
  };
});

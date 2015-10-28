class FeedController < ApplicationController

  include PostHelper
  include YoutubeVideoHelper
  include VineVideoHelper
  include InstagramVideoHelper
  include ActionView::Helpers::UrlHelper

  def index
    respond_to do |format|
      format.html do
        @posts = load_new_posts(ENV["HASHTAG"], 10)
        render "index"
      end
      format.json do
        @posts = Post.get_new_posts(ENV["HASHTAG"], 10)
        render_json_posts @posts
      end
    end
  end

  def get_next_page
    @posts = Post.next_posts(params[:last_post_id], 10)
    if @posts.empty?
      logger.debug 'DEBUG: @posts is empty. Loading new posts...'
      @posts = load_new_posts(ENV["HASHTAG"], 10)
    end
    render_json_posts @posts
  end

  private

  def load_new_posts(hashtag, limit)
    @posts = Post.sorted_posts(hashtag, limit)
    return @posts.each { |post| post.text = add_post_links post }
  end

  def render_json_posts(posts)
    if posts.nil? || posts.empty?
      render json: posts, status: :not_modified
    else
      posts.each { |post| post.text = add_post_links post }
      render json: posts
    end
  end

end

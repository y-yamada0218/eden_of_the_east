(function() {
  function comments_open(comments) {
    $('.commentList').show();
    $('.commenter').remove();
    $('.comment-form').remove();
    $('.comment-icon').html(`<div id="comment-close-icon">
                              <i class="fas fa-comment-dots icon">
                                ${comments.length}
                              </i>
                            </div>`);

    //メッセージに対するコメント一覧を生成
    for (var i = 0; i < comments.length; i++) {
      var html = window.buildCommentHTML(comments[i])
      $('.commentList').append(html);
    }
    
    //投稿用フォームを追加
    var commentFormHTML = window.commentFormHTML();
    $('.commentBox').append(commentFormHTML);
    $('.commentBox').hide();
    $('.commentBox').slideDown(300);

    //messageの文字数カウント
    var input = document.getElementById("content");
    var span = document.getElementById("inputCounter-comment");
    input.addEventListener("keyup", function() {
      span.textContent = input.value.length;
    });

    //もう一度コメントボタンが押された場合
    $('#comment-close-icon').click(function() {
      $('.comment-icon').html(`
                              <div id="comment-open-icon">
                                <i class="fas fa-comment-dots icon">
                                  ${comments.length}
                                </i>
                              </div>
                              `);
      $('.commentBox').slideUp();

      $('#comment-open-icon').click(function() {
        comments_open(comments);
      });
    })

    $('#comment-to-message').on('submit', function(e){
      e.preventDefault(e)
      var message_id = $('.detailMessage').children(':hidden[name="message_id"]').val();
      var formData = new FormData(this);
      var url = "/comments";
  
      formData.append('message_id', message_id);
        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(commentData){
          var html = window.buildCommentHTML(commentData)
          $('.commentList').append(html);
          $('#content').val('');
          $('.commentPost').prop('disabled', false);
        })
        .fail(function() {
          alert("メッセージ送信に失敗しました");
        });
    })
  }

  //コメント投稿ボタンが押された処理

  //関数をグローバル変数にする
  window.comments_open = comments_open;
})();

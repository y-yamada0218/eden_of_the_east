(function() {

  function buildMessageHTML(message,messagePosition,MyPosition) { 
    var range = window.searchRange(messagePosition,MyPosition);
    const html = `
                  <div class="message">
                    <input type="hidden" name="message_id" value="${message.id}">
                    <div class="message__user">
                      <div class="message__user__img"></div>
                      <div class="message__user__name">
                        ${message.user_name}
                      </div>
                    </div>
                    <div class="message__info">
                      <div class="message__info__comment">
                      ${message.comment}
                      </div>
                      <div class="message__info__time">
                        <time datetime="${message.created_at}">
                          ${moment(message.created_at).fromNow()}
                        </time>
                      </div>
                    </div>
                    <div class="message__distance">
                      現在地からの距離：  ${range}km
                    </div>
                  </div>
                  `;
    return html;
  }
  
  //メッセージの詳細表示
  function buildDetailMessageHTML(messageData, MyPosition) {
    var messagePosition = [];
      messagePosition.push(messageData.latitude,messageData.longitude);
      var range = window.searchRange(messagePosition,MyPosition);
      var detailMessagehtml = `
                              <div class="detailMessage">
                                <input type="hidden" name="message_id" value="${messageData.id}">
                                  <div class="back-icon">
                                    <i class="fas fa-angle-double-left icon"></i>
                                  </div>
                                  <div class="detailMessage__header">
                                    <div class="user-info">
                                      <div class="icon"></div>
                                      <div class="name">
                                        ${messageData.user_name}
                                      </div>
                                    </div>
                                    <div class="menu">
                                      <i class="fas fa-angle-down icon"></i>
                                    </div>
                                  </div>
                                  <div class="detailMessage__contener">
                                    <div class="comment-info">
                                      <div class="comment">
                                      ${messageData.comment}
                                    </div>
                                    <div class="time">
                                      ${messageData.created_at}
                                    </div>
                                  </div>
                                <div class="distance">
                                  現在地からの距離：  ${range}km
                                </div>
                                  <div class="position-route">
                                    <div class="position">
                                      <div class="latitude">
                                        緯度：  ${messageData.latitude}
                                      </div>
                                      <div class="longitude">
                                        経度：  ${messageData.longitude}
                                      </div>
                                    </div>
                                    <div class="route">
                                      <i class="fas fa-route"></i>
                                    </div>
                                </div>
                                <div class="detailMessage__footer">
                                  <div class="menu">
                                    <div class="comment-icon">
                                      <div id="comment-open-icon">
                                        <i class="fas fa-comment-dots icon">
                                          ${messageData.comments.length}
                                        </i>
                                      </div>
                                    </div>
                                    <div class="detail-icon">
                                      <div id="favorit-create-icon">
                                        <i class="far fa-heart icon"></i>
                                      </div>
                                    </div>
                                    <div id="DM-icon">
                                      <i class="fas fa-envelope icon"></i>
                                    </div>
                                  </div>
                                <div class="problemReport">
                                  <div id="report-icon">
                                    <i class="fas fa-exclamation-circle icon"></i>
                                  </div>
                                </div>
                                </div>
                                <div class="detailMessage__comments">
                                  <div class="commentBox">
                                    <div class="commentList"></div>
                                  </div>
                                </div>
                              </div>
                              `
      return detailMessagehtml
  }
    
    //メッセージに対するコメントを表示する
  function buildCommentHTML(comment) {
    var html =`
              <div class="commenter">
                <div class="commenter__header">
                  <div class="user-info">
                    <div class="user-img"></div>
                    <div class="user-name">
                      ${comment.user_name}
                    </div>
                  </div>
                  <div class="comment-time">
                    ${comment.created_at}
                  </div>
                </div>
                <div class="commenter__content">
                ${comment.content}
                </div>
              </div>
              `
    return html
  }

  function commentFormHTML() {
    var html = `
              <div class="comment-form">
                <form id="comment-to-message" action="/comments" accept-charset="UTF-8" method="post">
                <input type="hidden" name="authenticity_token" value="bSMtD6PMUnEbWCtRG0ASVmWrPNWa7crE6fue47qILRWNusT2hY+jG1yVrmuab0xokhaY43z49u55xGy5YtjUlw==">
                  <div class="comment-form__contener">
                    <textarea class="comment-form__contener__comment" required="required" maxlength="250" placeholder="メッセージにコメント" name="content" id="content"></textarea>
                  </div>
                  <div class="text-count">
                    <div id="inputCounter-comment">0</div>
                    /250
                    </div>
                  <input type="submit" class="commentPost" data-disable-with="コメントする" id="post-comment" name="commit" value="コメントする">
                </form>
              </div>
              `
    return html
  }
    
  //関数をグローバル変数にする
  window.buildMessageHTML = buildMessageHTML;
  window.buildDetailMessageHTML = buildDetailMessageHTML;
  window.buildCommentHTML = buildCommentHTML;
  window.commentFormHTML = commentFormHTML;
})();

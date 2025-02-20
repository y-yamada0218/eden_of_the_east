import {userLoad_map} from "./get_messages.js"
import {load_map} from "./packs/application.js"
window.addEventListener('load', function () {
  $('.message-form').hide()
    var current_user = gon.user
  var html = `
              <div class="message-form">
                <form id="new-message" action="/messages" accept-charset="UTF-8" method="post">
                <input type="hidden" name="authenticity_token" value="MDtDXFWjHUb5Ug3DWyVicKjro7ZVR8ABfODhWJ/Ai2AGRDwGx6ieIU5F9QSxm6Em1ZZoeQ/bVL75/la1J02S+w=="><div class="message-form">
                <div class="form-header"></div>
                <div class="form-container">
                <div class="user">
                  <img class="icon" src="${current_user.user_image}" width="50" height="50">
                </div>
                <div class="message-container">
                  <textarea class="message-container__comment" id="comment_body" required="required" maxlength="250" placeholder="ここに何があるかみんなに共有しよう！" name="comment"></textarea>
                  <div class="message-container__footer">
                    <div class="image-icon">
                      <i class="fas fa-image icon"></i>
                    </div>
                    <div class="text-count">
                      <div id="inputCounter">0</div>
                        /250
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <input type="submit" name="commit" value="投稿" class="commentBtn" data-disable-with="投稿">
              </form></div>
            `

  document.getElementById("message-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');
    home_icon.style.color = '#909096';
    message_icon.style.color = '#5bf7fc';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096'; 

    $('.info-off').hide()
    $('.info-on').show()
    $('.user-page').hide()
    $('.messageUpdate').hide();
    $('.messagesList').hide();
    $('.config-position').hide();
    $('.back-icon').remove();
    $('.message-form').remove();
    $('.detailMessage').remove();
    $('.messagesBox').append(html);
    $('.message-form').hide().fadeIn(200);

  //messageの文字数カウント
    var input = document.getElementById("comment_body");
    var span = document.getElementById("inputCounter");
    input.addEventListener("keyup", function() {
      span.textContent = input.value.length;
    });

     //投稿ボタンを押された時の非同期通信
    $('#new-message').on('submit', function(e){
      e.preventDefault(e)
      var formData = new FormData(this);
      var url = "/messages";
      //ユーザの現在地（緯度・経度）を格納する変数を宣言
      var MyPosition = [];

      //現在地を取得するための関数（これの処理が終わるまで非同期通信は停止）
      function positionResolve() {
        return new Promise(resolve => {
          setTimeout(() => {
            navigator.geolocation.getCurrentPosition(
              function getPosition(position) {
                MyPosition.push(position.coords.latitude, position.coords.longitude);
                resolve(MyPosition);
              })
          }, 700);
        })
      }

      //現在地を取得する関数を呼び出す
      async function GetMyPosition() {
        //positionResolve()に対して await を指定して処理が完了するまで非同期を止める
        const myPosition = await positionResolve();
        return myPosition
      }
      //現在地取得が完了して実行される処理
      GetMyPosition().then(result => {
        //JavaScript で取得した現在地を formData に追加する
        formData.append('latitude', result[0]);
        formData.append('longitude', result[1]);

        $.ajax({
          url: url,
          type: "POST",
          data: formData,
          dataType: 'json',
          processData: false,
          contentType: false
        })
        .done(function(data){
          $('#comment_body').val('');
          $('.commentBtn').prop('disabled', false);

          var home_icon = document.getElementById('home-icon');
          var message_icon = document.getElementById('message-icon');
          home_icon.style.color = '#5bf7fc';
          message_icon.style.color = '#909096';

          $('.error-message').remove();
          var html = window.buildMessageHTML(data, MyPosition, MyPosition);
          $('.messagesList').prepend(html);
          $('.messagesList').hide();
          $('.message-form').hide()
          $('.messageUpdate').show();
          $('.user-page').hide()
          $('.messagesList').slideDown(400);

          //メッセージをクリックしたとき
          //>>click_message.js
          $('.message').unbind().click(function() {
            var message_id = $(this).children(':hidden[name="message_id"]').val();
            window.click_message(message_id, MyPosition);
          })
          
          //マーカの設置
          if (userLoad_map != null) {
            var marker_id = data.id
            var MessageLatLng = new google.maps.LatLng(MyPosition[0],MyPosition[1]);
            var marker = new google.maps.Marker({
              id : data.id,
              map : userLoad_map,             // 対象の地図オブジェクト
              position : MessageLatLng,   // 緯度・経度
              animation: google.maps.Animation.DROP
            });
          } else {
            var marker_id = data.id
            var MessageLatLng = new google.maps.LatLng(MyPosition[0],MyPosition[1]);
            var marker = new google.maps.Marker({
              id : data.id,
              map : load_map,             // 対象の地図オブジェクト
              position : MessageLatLng,   // 緯度・経度
              animation: google.maps.Animation.DROP
            });
          }

          // マーカーをクリックしたとき
          //>>click_marker.js
          marker.addListener('click', function() {
            window.click_marker(marker_id, MyPosition);
          });
        })
        .fail(function(data) {
          alert("メッセージ送信に失敗しました");
        });
      });
    })
  };
})
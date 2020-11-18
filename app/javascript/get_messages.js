let userLoad_map;
export {userLoad_map}

window.addEventListener('load', function () {
var btn = document.getElementById("btn");
btn.addEventListener('click', function() {  
    
    //現在地のみの配列
    var MyPosition = [];
    const url = '/message';
    
    //現在地の取得
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function getPosition(position) {
        var MyLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        //現在の位置情報を格納する
        MyPosition.push(position.coords.latitude, position.coords.longitude);

        jQuery.ajax({
          url: url,
          type: "POST",
          data: {position: MyPosition},
          dataType: 'json',
        })
          .done(function(messages){
            var Options = {
              zoom: 14,      //地図の縮尺値
              center: MyLatLng,    //地図の中心座標
              mapTypeId: 'roadmap'   //地図の種類
            };
            
            userLoad_map = new google.maps.Map(
              document.getElementById('map'), Options
            );

            var marker = new google.maps.Marker({
              map : userLoad_map,             // 対象の地図オブジェクト
              position : MyLatLng,   // 緯度・経度
              animation: google.maps.Animation.DROP,
              icon: {
                fillColor: "#93d5ff",                //塗り潰し色
                fillOpacity: 0.8,                    //塗り潰し透過率
                path: google.maps.SymbolPath.CIRCLE, //円を指定
                scale: 14,                           //円のサイズ
                strokeColor: "#006dff",              //枠の色
                strokeWeight: 1.0                    //枠の透過率
              }
            });

            if (messages.length != 0) {
            //過去に更新したメッセージ一覧を削除
              $('.message').remove();
              $('.error-message').remove();
                //地点のメッセージを表示
              for (var i = 0; i < messages.length; i++) {
                const marker_id = messages[i].id
                var messagePosition = [];
                var MessageLatLng = new google.maps.LatLng(messages[i].latitude, messages[i].longitude);
                messagePosition.push(messages[i].latitude, messages[i].longitude);
                let markers;
                markers = new google.maps.Marker({
                  id : messages[i].id,
                  map : userLoad_map,             // 対象の地図オブジェクト
                  position : MessageLatLng,   // 緯度・経度
                  animation: google.maps.Animation.DROP
                });

              //取得したメッセージを表示させる
              //>>build_html.js
              var html = window.buildMessageHTML(messages[i],messagePosition,MyPosition);
              $('.messagesList').prepend(html);
              
              // マーカーをクリックしたとき
              //>>click_marker.js
              markers.addListener('click', function() {
                window.click_marker(marker_id, MyPosition);
              });
            }
            $('.messagesList').hide();
            $('.messagesList').slideDown(400);

              //メッセージをクリックしたとき
              //>>click_message.js
              $('.message').click(function() {
                var message_id = $(this).children(':hidden[name="message_id"]').val();
                window.click_message(message_id, MyPosition);
              })
            } else {
              $('.message').remove();
              $('.messagesList').append(`
                                        <div class="error-message">
                                          <div class="message-notFound">
                                            <div class="error-top">MESSAGE NOT FOUND</div>
                                            <div class="error-main">検索条件を変更して再度更新してください</div>
                                            <div class="error-bottom">Please change the search conditions and update again.</div>
                                          </div>
                                        </div>`);
              $('.messagesList').hide();
              $('.messagesList').slideDown(400);
            }
          })
          .fail(function(){
            alert('error');
          })
        }
      );
    }
  })
})
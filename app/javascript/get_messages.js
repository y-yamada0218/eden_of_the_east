window.addEventListener('load', function () {
var btn = document.getElementById("btn");
  btn.addEventListener('click', function() {  

    function buildMessageHTML(message,messagePosition,MyPosition) { 
      var range = searchRange(messagePosition,MyPosition);
      const html = `
                    <div class="message">
                      <input type="hidden" name="comment" value="${message.comment}">
                      <input type="hidden" name="latitude" value="${messagePosition[0]}">
                      <input type="hidden" name="longitude" value="${messagePosition[1]}">
                      <input type="hidden" name="range" value="${range}">
                      <input type="hidden" name="time" value="${message.created_at}">
                      <input type="hidden" name="user_name" value="${message.user_name}">
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

    function buildDetailMessageHTML(comment, lat, lng, range, time, user_name) {
      
    }
    //ユーザの現在地からメッセージの座標までの距離を計算
    function searchRange(messagePosition,MyPosition) { 
      lat1 = parseFloat(messagePosition[0]);
      lng1 = parseFloat(messagePosition[1]);
      lat2 = MyPosition[0];
      lng2 = MyPosition[1];

      lat1 *= Math.PI / 180;
      lng1 *= Math.PI / 180;
      lat2 *= Math.PI / 180;
      lng2 *= Math.PI / 180;
      
      range = 6371 * 
              Math.acos(Math.cos(lat1) * 
              Math.cos(lat2) * 
              Math.cos(lng2 - lng1) + 
              Math.sin(lat1) * 
              Math.sin(lat2));
      range = range * 10000;
      range = Math.round(range);
      range = range / 10000;
      return range 
    }


    //マップに表示させるための配列
    var marker = [];
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
        //検索範囲を格納
        var searchRange = 20;

        jQuery.ajax({
          url: url,
          type: "POST",
          data: {position: MyPosition, range: searchRange},
          dataType: 'json',
        })
          .done(function(messages){
            var Options = {
              zoom: 13.5,      //地図の縮尺値
              center: MyLatLng,    //地図の中心座標
              mapTypeId: 'roadmap'   //地図の種類
            };

            var map = new google.maps.Map(
              document.getElementById('map'), Options
            );

            var marker = new google.maps.Marker({
              map : map,             // 対象の地図オブジェクト
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
            $('.message').remove();
              //地点のメッセージを表示
              for (var i = 0; i < messages.length; i++) {
                var messagePosition = [];
                var MessageLatLng = new google.maps.LatLng(messages[i].latitude, messages[i].longitude);
                messagePosition.push(messages[i].latitude, messages[i].longitude);
                marker = new google.maps.Marker({
                  map : map,             // 対象の地図オブジェクト
                  position : MessageLatLng,   // 緯度・経度
                  animation: google.maps.Animation.DROP
                });
                var html = buildMessageHTML(messages[i],messagePosition,MyPosition);
                $('.messagesList').append(html);
              }

              //クリックされたメッセージの情報を表示
              $('.message').click(function() {
                //(this) を指定してあげると選択された要素が何番目
                var comment = $(this).children(':hidden[name="comment"]').val();
                var lat = $(this).children(':hidden[name="latitude"]').val();
                var lng = $(this).children(':hidden[name="longitude"]').val();
                var range = $(this).children(':hidden[name="range"]').val();
                var time = $(this).children(':hidden[name="time"]').val();
                var user_name = $(this).children(':hidden[name="user_name"]').val();

                $('.message').remove();
                var detailMessagehtml = buildDetailMessageHTML(comment, lat, lng, range, time, user_name);
                $('.messagesList').append(detailMessagehtml);
              })
          })
          .fail(function(){
            alert('error');
          })
        }
      );
    }
  })
})
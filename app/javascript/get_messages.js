window.addEventListener('load', function () {
var btn = document.getElementById("btn");
  btn.addEventListener('click', function() {  

    function buildMessageHTML(message,messagePosition,MyPosition) { 
      const html = `
                    <div class="message">
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
                        ${message.created_at}
                        </div>
                      </div>
                      <div class="message__distance">
                        現在地からの距離：  ${searchRange(messagePosition,MyPosition)}km
                      </div>
                    </div>
                    `;
      return html;
    }
    function searchRange(messagePosition,MyPosition) { 
      console.log(MyPosition)
      lat1 = parseFloat(messagePosition[0]);
      lng1 = parseFloat(messagePosition[1]);
      lat2 = MyPosition[0];
      lng2 = MyPosition[1];

      lat1 *= Math.PI / 180;
      lng1 *= Math.PI / 180;
      lat2 *= Math.PI / 180;
      lng2 *= Math.PI / 180;
      
      range = 6371 * Math.acos(Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) + Math.sin(lat1) * Math.sin(lat2));
      range = range * 1000000;
      range = Math.round(range);
      range = range / 1000000;
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
             //コントローラで取得したメッセージをJSで取得

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
          })
          .fail(function(){
            alert('error');
          })
        }
      );
    }
  })
})
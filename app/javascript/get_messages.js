window.addEventListener('load', function () {
var btn = document.getElementById("btn");
  btn.addEventListener('click', function() {  
    var messages = [];
    messages = gon.messages
    var marker = [];

    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function getPosition(position) {
        var MyLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

        var Options = {
          zoom: 13.5,      //地図の縮尺値
          center: MyLatLng,    //地図の中心座標
          mapTypeId: 'roadmap'   //地図の種類
        };
        var map = new google.maps.Map(
          document.getElementById('map'), Options);
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

          for (var i = 0; i < messages.length; i++) {
            var MessageLatLng = new google.maps.LatLng(messages[i].latitude, messages[i].longitude);
            marker = new google.maps.Marker({
              map : map,             // 対象の地図オブジェクト
              position : MessageLatLng,   // 緯度・経度
              animation: google.maps.Animation.DROP
            });
          }
        }
      );
    }
  })
})
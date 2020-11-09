window.addEventListener('load', () => {
  //Geolocation APIに対応しているかどうか判断
  if (navigator.geolocation){
    //【参考記事】https://qiita.com/Haruka-Ogawa/items/997401a2edcd20e61037
    //表示させる地図情報の緯度経度(現在地の取得)【参考記事】https://qiita.com/matsubishi5/items/0afa6845ea024c081d76
    navigator.geolocation.getCurrentPosition(
      function getPosition(position) {
      //緯度・経度を変数に格納
      var MyLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      //googlemapの設定を変数に格納
      var Options = {
        zoom: 13.5,      //地図の縮尺値
        center: MyLatLng,    //地図の中心座標
        mapTypeId: 'roadmap'   //地図の種類
      };
      //【マップ作成】設定したオプション設定(変数:Options)を指定し、Mapクラスを利用して、マップオブジェクトを作成。
      var map = new google.maps.Map(
        document.getElementById('map'), Options);
      //　マップにマーカーを表示する
      var marker = new google.maps.Marker({
        map : map,             // 対象の地図オブジェクト
        position : MyLatLng,   // 緯度・経度
        animation: google.maps.Animation.DROP,
        //マーカーのデザイン
        icon: {
          fillColor: "#93d5ff",                //塗り潰し色
          fillOpacity: 0.8,                    //塗り潰し透過率
          path: google.maps.SymbolPath.CIRCLE, //円を指定
          scale: 14,                           //円のサイズ
          strokeColor: "#006dff",              //枠の色
          strokeWeight: 1.0                    //枠の透過率
        }
      });
    },
      function(error) {
        // エラーメッセージを表示
        switch(error.code) {
          case 1: // PERMISSION_DENIED
            alert("位置情報の利用が許可されていません");
            break;
          case 2: // POSITION_UNAVAILABLE
            alert("現在位置が取得できませんでした");
            break;
          case 3: // TIMEOUT
            alert("タイムアウトになりました");
            break;
          default:
            alert("その他のエラー(エラーコード:"+error.code+")");
            break;
        }
      }
    );
  }
})


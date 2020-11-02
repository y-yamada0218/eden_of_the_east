window.addEventListener('load', () => {
  // const hide = document.getElementsByTagName('head')[0]//.childNodes

  // let map;

  // function initMap() {
  //   // 位置情報を取得
  //   navigator.geolocation.getCurrentPosition(function (position) {
  //   LatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

  //     // 取得した位置情報を中心に表示
  //     map = new google.maps.Map(document.getElementById('map'), {
  //       center: LatLng,
  //       zoom: 15
  //     });
  //   });
  // }

  var MyLatLng = new google.maps.LatLng(35.6811673, 139.7670516);
  var Options = {
    zoom: 15,      //地図の縮尺値
    center: MyLatLng,    //地図の中心座標
    mapTypeId: 'roadmap'   //地図の種類
  };
  var map = new google.maps.Map(document.getElementById('map'), Options);
});

window.addEventListener('load', () => {
  $('script').remove();
})
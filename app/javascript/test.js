window.addEventListener("load", function() {
  // const obj = {
  //   name: "yogo",
  //   age: "18",
  //   speak: function() {
  //     console.log("hello");
  //   }
  // }

  // obj.color = "violet"

  // console.log(obj);





  // let rendererOptions = {
  //   map: map, // 描画先の地図
  //   draggable: true, // ドラッグ可
  //   preserveViewport: true // centerの座標、ズームレベルで表示
  // };

  //   let directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
  //   let directionsService = new google.maps.DirectionsService();
  //   directionsDisplay.setMap(map);

  //   let request = {
  //   origin: new google.maps.LatLng(startLatLng[0], startLatLng[1]), // スタート地点
  //   destination: new google.maps.LatLng(targetLatLng[0], targetLatLng[1]), // ゴール地点
  //   travelMode: google.maps.DirectionsTravelMode.WALKING, // 移動手段
  //   };

  //   directionsService.route(request, function(response,status) {
  //     if (status === google.maps.DirectionsStatus.OK) {
  //     new google.maps.DirectionsRenderer({
  //       map: map,
  //       directions: response,
  //       suppressMarkers: true // デフォルトのマーカーを削除
  //     });
  //       let leg = response.routes[0].legs[0];
  //       makeMarker(leg.end_location, markers.goalMarker, map);
  //       setTimeout(function() {
  //       map.setZoom(16); // ルート表示後にズーム率を変更
  //       });
  //     }
  //   });
})
window.addEventListener('load', () => {
  // function buildMessageHTML(message,messagePosition,MyPosition) { 
  //   const html = `
  //                 <div class="message">
  //                   <div class="message__user">
  //                     <div class="message__user__img"></div>
  //                     <div class="message__user__name">
  //                       ${message.user_name}
  //                     </div>
  //                   </div>
  //                   <div class="message__info">
  //                     <div class="message__info__comment">
  //                     ${message.comment}
  //                     </div>
  //                     <div class="message__info__time">
  //                       <time datetime="${message.created_at}">
  //                         ${moment(message.created_at).fromNow()}
  //                       </time>
  //                     </div>
  //                   </div>
  //                   <div class="message__distance">
  //                     現在地からの距離：  ${searchRange(messagePosition,MyPosition)}km
  //                   </div>
  //                 </div>
  //                 `;
  //   return html;
  // }
  // //ユーザの現在地からメッセージの座標までの距離を計算
  // function searchRange(messagePosition,MyPosition) { 
  //   lat1 = parseFloat(messagePosition[0]);
  //   lng1 = parseFloat(messagePosition[1]);
  //   lat2 = MyPosition[0];
  //   lng2 = MyPosition[1];

  //   lat1 *= Math.PI / 180;
  //   lng1 *= Math.PI / 180;
  //   lat2 *= Math.PI / 180;
  //   lng2 *= Math.PI / 180;
    
  //   range = 6371 * 
  //           Math.acos(Math.cos(lat1) * 
  //           Math.cos(lat2) * 
  //           Math.cos(lng2 - lng1) + 
  //           Math.sin(lat1) * 
  //           Math.sin(lat2));
  //   range = range * 10000;
  //   range = Math.round(range);
  //   range = range / 10000;
  //   return range 
  // }


  // //マップに表示させるための配列
  // var marker = [];
  // //現在地のみの配列
  // var MyPosition = [];
  // const url = '/message';
  

  // //現在地の取得
  // if (navigator.geolocation){
  //   navigator.geolocation.getCurrentPosition(
  //     function getPosition(position) {
  //     var MyLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  //     //現在の位置情報を格納する
  //     MyPosition.push(position.coords.latitude, position.coords.longitude);
  //     //検索範囲を格納
  //     var searchRange = 20;

  //     jQuery.ajax({
  //       url: url,
  //       type: "POST",
  //       data: {position: MyPosition, range: searchRange},
  //       dataType: 'json',
  //     })
  //       .done(function(messages){
  //          //コントローラで取得したメッセージをJSで取得
  //          messagesListJS = messages;
  //         var Options = {
  //           zoom: 13.5,      //地図の縮尺値
  //           center: MyLatLng,    //地図の中心座標
  //           mapTypeId: 'roadmap'   //地図の種類
  //         };

  //         var map = new google.maps.Map(
  //           document.getElementById('map'), Options
  //         );

  //         var marker = new google.maps.Marker({
  //           map : map,             // 対象の地図オブジェクト
  //           position : MyLatLng,   // 緯度・経度
  //           animation: google.maps.Animation.DROP,
  //           icon: {
  //             fillColor: "#93d5ff",                //塗り潰し色
  //             fillOpacity: 0.8,                    //塗り潰し透過率
  //             path: google.maps.SymbolPath.CIRCLE, //円を指定
  //             scale: 14,                           //円のサイズ
  //             strokeColor: "#006dff",              //枠の色
  //             strokeWeight: 1.0                    //枠の透過率
  //           }
  //         });
  //         $('.message').remove();
  //           //地点のメッセージを表示
  //           for (var i = 0; i < messages.length; i++) {
  //             var messagePosition = [];
  //             var MessageLatLng = new google.maps.LatLng(messages[i].latitude, messages[i].longitude);
  //             messagePosition.push(messages[i].latitude, messages[i].longitude);
  //             marker = new google.maps.Marker({
  //               map : map,             // 対象の地図オブジェクト
  //               position : MessageLatLng,   // 緯度・経度
  //               animation: google.maps.Animation.DROP
  //             });
  //             var html = buildMessageHTML(messages[i],messagePosition,MyPosition);
  //             $('.messagesList').append(html);
  //           }
  //       })
  //       .fail(function(){
  //         alert('error');
  //       })
  //     }
  //   );
  // }
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
        //animation: google.maps.Animation.DROP,
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


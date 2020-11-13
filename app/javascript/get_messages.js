// import map from "./get_position"
window.addEventListener('load', function () {
var btn = document.getElementById("btn");
  btn.addEventListener('click', function() {  

    function buildMessageHTML(message,messagePosition,MyPosition) { 
      var range = searchRange(messagePosition,MyPosition);
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

    function buildDetailMessageHTML(messageData, MyPosition) {
      var messagePosition = [];
      messagePosition.push(messageData.latitude,messageData.longitude);
      var range = searchRange(messagePosition,MyPosition);
      var detailMessagehtml = `
                              <div class="detailMessage">
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
                                  <div id="comment-icon">
                                    <i class="fas fa-comment-dots icon"></i>
                                  </div>
                                  <div id="favorit-icon">
                                    <i class="far fa-heart icon"></i>
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
                              </div>
                              `
      return detailMessagehtml
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
    var messageMarker = [];
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
              zoom: 14,      //地図の縮尺値
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
              const marker_id = messages[i].id
              var messagePosition = [];
              var MessageLatLng = new google.maps.LatLng(messages[i].latitude, messages[i].longitude);
              messagePosition.push(messages[i].latitude, messages[i].longitude);
              markers = new google.maps.Marker({
                id : messages[i].id,
                map : map,             // 対象の地図オブジェクト
                position : MessageLatLng,   // 緯度・経度
                animation: google.maps.Animation.DROP
              });
              //取得したメッセージを表示させる
              var html = buildMessageHTML(messages[i],messagePosition,MyPosition);
              $('.messagesList').append(html);
              $('.message').hide();
              $('.message').slideDown(300);
              console.log(marker_id)
              // マーカーをクリックしたとき
              markers.addListener('click', function() {
                var url = '/messages/' + marker_id

                $.ajax({
                  url: url,
                  type: "get",
                  dataType: 'json',
                })
                .done(function(messageData){
                  //メッセージ一覧を隠す
                  $('.message').hide();
                  $('.messageUpdate').hide();
                  $('.config-position').hide();
                  $('.detailMessage').remove();
                  //$('.back-icon').remove();
                  var detailMessagehtml = buildDetailMessageHTML(messageData, MyPosition);
                  $('.messagesList').append(detailMessagehtml);
                  map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));

                  //経路ボタンを押した時

                  //backした時
                  $('.back-icon').click(function() {
                    $('.detailMessage').remove();
                    //$('.back-icon').remove();
                    $('.message').show();
                    $('.messageUpdate').show();
                  })
                })
                .fail(function() {
                  alert("メッセージ送信に失敗しました");
                });
              });
            }


              //クリックされたメッセージの情報を表示
              $('.message').click(function() {
                //(this) を指定してあげると選択された要素が何番目
                var message_id = $(this).children(':hidden[name="message_id"]').val();
                var url = '/messages/' + message_id

                $.ajax({
                  url: url,
                  type: "get",
                  dataType: 'json',
                })
                .done(function(messageData){
                  //メッセージ一覧を隠す
                  $('.message').hide();
                  $('.messageUpdate').hide();
                  var detailMessagehtml = buildDetailMessageHTML(messageData,MyPosition);
                  $('.messagesList').append(detailMessagehtml);
                  //マップメッセージの座標に移動
                  map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));
                  //backした時
                  $('.back-icon').click(function() {
                    $('.detailMessage').remove();
                    //$('.back-icon').remove();
                    $('.message').show();
                    $('.messageUpdate').show();
                  })
                })
                .fail(function() {
                  alert("メッセージ送信に失敗しました");
                });
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
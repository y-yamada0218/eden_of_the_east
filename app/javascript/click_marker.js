import {userLoad_map} from "./get_messages.js"
import {load_map} from "./packs/application.js"
(function() {
  function click_marker(marker_id, MyPosition) {
    var url = '/messages/' + marker_id

    $.ajax({
      url: url,
      type: "get",
      dataType: 'json',
    })
    .done(function(messageData){
      //メッセージ一覧を隠す

      $('.message').hide();
      $('.info-off').hide()
      $('.info-on').show()
      $('.user-page').hide()
      $('.messageUpdate').hide();
      $('.config-position').hide();
      $('.message-form').hide()
      $('.detailMessage').remove();
      var detailMessagehtml = window.buildDetailMessageHTML(messageData, MyPosition);
      $('.messagesList').append(detailMessagehtml);
      $('.commentList').hide();
      $('.messagesList').show();
      
      //マップメッセージの座標に移動
      if (userLoad_map != null) {
        userLoad_map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));
      } else {
        load_map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));
      }

      //backした時
      $('.back-icon').click(function() {
        $('.detailMessage').remove();
        $('.message').show();
        $('.messageUpdate').show();
      })

      //favoriteアイコンを押した時(お気に入り登録)
      //>>favorite.js
      $('#favorit-create-icon').click(function() {
        window.favorite_create(marker_id);
      })

      //favoriteアイコンを押した時(お気に入り削除)
      //>>favorite.js
      $('#favorit-delete-icon').click(function() {
        window.favorite_delete(marker_id);
      })

      //commentアイコンを押した時(コメント表示)
      //>>comments.js
      $('#comment-open-icon').click(function() {
        window.comments_open(messageData.comments);
      })
    })
    .fail(function() {
      alert("メッセージの取得に失敗しました");
    });
  }

  window.click_marker = click_marker;
})();
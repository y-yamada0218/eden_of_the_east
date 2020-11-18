import {userLoad_map} from "./get_messages.js"
import {load_map} from "./packs/application.js"
(function() {
  function click_message(message_id, MyPosition) {
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
      $('.message-form').hide()
      var detailMessagehtml;
      detailMessagehtml = window.buildDetailMessageHTML(messageData,MyPosition);
      $('.messagesList').append(detailMessagehtml);
      $('.commentList').hide();

      //マップメッセージの座標に移動
      if (userLoad_map != null) {
        userLoad_map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));
      } else {
        load_map.panTo(new google.maps.LatLng(messageData.latitude,messageData.longitude));
      }


      //backアイコンを押した時
      $('.back-icon').click(function() {
        $('.detailMessage').remove();
        $('.message').show();
        $('.messageUpdate').show();
      })

      //favoriteアイコンを押した時(お気に入り登録)
      //>>favorite.js
      $('#favorit-create-icon').click(function() {
        window.favorite_create(message_id);
      })
      //favoriteアイコンを押した時(お気に入り削除)
      //>>favorite.js
      $('#favorit-delete-icon').click(function() {
        window.favorite_delete(message_id);
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

  window.click_message = click_message;
})();

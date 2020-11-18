(function() {
  function favorite_create(message_id) {
    var url = '/favorites';

    $.ajax({
      url: url,
      type: "POST",
      data: {message_id: message_id},
      dataType: 'json',
    })
    .done(function(){
      $('.detail-icon').html(`
        <div id="favorit-delete-icon">
          <i class="fas fa-heart icon"></i>
        </div>
      `)

      $('#favorit-delete-icon').click(function() {
        favorite_delete(message_id);
      })
    })
    .fail(function() {
      alert("お気に入りに失敗しました");
    });
  }

  function favorite_delete(message_id) {
    var url = `/favorite/delete`;
    $.ajax({
      url: url,
      type: "POST",
      data: {message_id: message_id},
      dataType: 'json',
    })
    .done(function(){
      $('.detail-icon').html(`
        <div id="favorit-create-icon">
          <i class="far fa-heart icon"></i>
        </div>
      `)
      
      $('#favorit-create-icon').click(function() {
        favorite_create(message_id);
      })
    })
    .fail(function() {
      alert("お気に入り削除に失敗しました");
    });
  }

  window.favorite_create = favorite_create;
  window.favorite_delete = favorite_delete;
})();

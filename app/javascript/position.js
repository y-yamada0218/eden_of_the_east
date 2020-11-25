window.addEventListener('load', function () {
  $('.config-position').hide();
  document.getElementById("position-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');

    home_icon.style.color = '#909096';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#5bf7fc';
    mail_icon.style.color = '#909096';

    $('.messageUpdate').hide();
    $('.messagesList').hide();
    $('.info-off').hide()
    $('.info-on').show()
    $('.user-page').hide()
    $('.back-icon').remove();
    $('.detailMessage').remove();
    $('.message-form').remove();
    $('.config-position').fadeIn(200);


    var select1 = document.querySelector("#time")
    select1.addEventListener('change', function(){
      var searchTime = $("#time").val();
      var searchRange = $("#range").val();

      updateConfig(searchTime,searchRange);
    })

    var select2 = document.querySelector("#range")
    select2.addEventListener('change', function(){
      var searchTime = $("#time").val();
      var searchRange = $("#range").val();

      updateConfig(searchTime,searchRange);
    })

    function updateConfig(searchTime,searchRange) {
      var config_id = $(':hidden[name="config_id"]').val();
      var url = '/search_configs/' + config_id

      $.ajax({
        url: url,
        type: "PATCH",
        data: {time: searchTime, range: searchRange},
        dataType: 'json',
      })
      .done(function(data){
      })
      .fail(function(data) {
      })
    }

  };
})
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
    $('.message').hide();
    $('.back-icon').remove();
    $('.detailMessage').remove();
    $('.message-form').remove();
    $('.config-position').show();

    var selectedValue = $("#time").val();
    console.log(selectedValue)

    var select1 = document.querySelector("#time")
    select1.addEventListener('change', function(){
      var searchTime_id = $("#time").val();
      console.log(searchTime_id)
    })

    var select2 = document.querySelector("#range")
    select2.addEventListener('change', function(){
      var searchRange_id = $("#range").val();
      console.log(searchRange_id)
    })

  };
})
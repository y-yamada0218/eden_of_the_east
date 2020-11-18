window.addEventListener('load', function () {
  document.getElementById("search-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');

    home_icon.style.color = '#909096';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#5bf7fc';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096';

    $('.messageUpdate').hide();
    $('.config-position').hide();
    $('.messagesList').hide();
    $('.back-icon').remove();
    $('.back-icon').remove();
    $('.detailMessage').remove();
    $('.message-form').remove();
  };
})
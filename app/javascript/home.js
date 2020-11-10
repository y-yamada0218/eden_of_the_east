window.addEventListener('load', function () {
  document.getElementById("home-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');

    home_icon.style.color = '#fff';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096';

    
  };
})
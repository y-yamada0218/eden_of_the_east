// const yamada = "yamada"
// export {yamada};
window.addEventListener('load', function () {
  document.getElementById("mail-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');

    home_icon.style.color = '#909096';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#5bf7fc';

    $('.messageUpdate').hide();
    $('.messagesList').hide();
    $('.config-position').hide();
    $('.back-icon').remove();
    $('.detailMessage').remove();
    $('.message-form').remove();
    $('.info-off').hide()
    $('.info-on').show()
    $('.user-page').hide()

  };
})
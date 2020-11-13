window.addEventListener('load', function () {
  var getMessageshtml = `<button class="messageUpdate" id="btn" type="submit">更新</button>`
  document.getElementById("home-icon").onclick = function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');
    
    home_icon.style.color = '#5bf7fc';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096';
    
    $('.messageUpdate').show();
    $('.message').slideDown(300);
    $('.back-icon').remove();
    $('.config-position').hide();
    $('.detailMessage').remove();
    $('.message-form').remove();

  };
})
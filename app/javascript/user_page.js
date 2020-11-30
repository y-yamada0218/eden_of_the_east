import {MyPosition} from "./get_messages.js"
import {load_map} from "./packs/application.js"
import {startMyPosition} from "./get_position.js"
window.addEventListener('load', () => {
  $('.user-page__main-tab__favorites').hide()
  $('.user-page__main-tab__DM').hide()
  $('.info-off').hide()
  $('.user-page').hide()

  $('.info-on__user').click(function() {
    var url = "/user/infomation";

    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');
    home_icon.style.color = '#909096';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096'; 
    $('.messageUpdate').hide();
    $('.message').hide();
    $('.messagesList').hide();
    $('.back-icon').remove();
    $('.config-position').hide();
    $('.detailMessage').remove();
    $('.message-form').remove();
    $('.info-on').hide()
    $('.info-off').show()
    $('.user-page').slideDown(400)

    if (MyPosition.length != 0) {
      var Position = MyPosition;
    }else {
      var Position = startMyPosition;
    }

    jQuery.ajax({
      url: url,
      type: "POST",
      dataType: 'json',
    })
    .done(function(data){
      $('.user-message').remove()
      var messages = data.messages 
      var favoritesMessage = data.favoritesMessage

      //userが投稿したメッセージを表示
      for (var i = 0; i < messages.length; i++) {
        var messagePosition = [];
        messagePosition.push(messages[i].latitude, messages[i].longitude);

        //取得したメッセージを表示させる
        //>>build_html.js
        var html = window.buildUserMessageHTML(messages[i],messagePosition,Position);
        $('.user-page__main-tab__messages').prepend(html);

        $('.user-message').unbind().click(function() {
          var message_id = $(this).children(':hidden[name="message_id"]').val();
          window.click_userPage_message(message_id, Position);
        })
        
      }
      //userがいいねしたメッセージを表示
      for (var i = 0; i < favoritesMessage.length; i++) {
        var messagePosition = [];
        messagePosition.push(favoritesMessage[i].latitude, favoritesMessage[i].longitude);

        //取得したメッセージを表示させる
        //>>build_html.js
        var html = window.buildUserMessageHTML(favoritesMessage[i],messagePosition,Position);
        $('.user-page__main-tab__favorites').prepend(html);

        $('.user-message').click(function() {
          var message_id = $(this).children(':hidden[name="message_id"]').val();
          window.click_message(message_id, Position);
        })
      }
    })
    .fail(function(){
      alert('error');
    })
  })

  $('.info-off').click(function() {
    var home_icon = document.getElementById('home-icon');
    var message_icon = document.getElementById('message-icon');
    var search_icon = document.getElementById('search-icon');
    var position_icon = document.getElementById('position-icon');
    var mail_icon = document.getElementById('mail-icon');
    home_icon.style.color = '#909096';
    message_icon.style.color = '#909096';
    search_icon.style.color = '#909096';
    position_icon.style.color = '#909096';
    mail_icon.style.color = '#909096';
    $('.info-off').hide()
    $('.info-on').show()
    $('.user-page').slideUp(400)
  })
  

  $('#user-tab__message').click(function() {
    var message_icon = document.getElementById('user-tab__message');
    var favorite_icon = document.getElementById('user-tab__favorite');
    var DM_icon = document.getElementById('user-tab__DM');

    message_icon.style.color = ' #5bf7fc';
    favorite_icon.style.color = '#909096';
    DM_icon.style.color = '#909096';

    $('.user-message').show();
    $('.detailMessage').remove();
    $('.user-page__main-tab__favorites').hide();
    $('.user-page__main-tab__DM').hide()
    $('.user-page__main-tab__messages').slideDown(400);
  })

  $('#user-tab__favorite').click(function() {
    var message_icon = document.getElementById('user-tab__message');
    var favorite_icon = document.getElementById('user-tab__favorite');
    var DM_icon = document.getElementById('user-tab__DM');

    message_icon.style.color = '#909096';
    favorite_icon.style.color = '#5bf7fc';
    DM_icon.style.color = '#909096';

    $('.user-message').show();
    $('.detailMessage').remove();
    $('.user-page__main-tab__DM').hide()
    $('.user-page__main-tab__messages').hide()
    $('.user-page__main-tab__favorites').slideDown(400);
  })

  $('#user-tab__DM').click(function() {
    var message_icon = document.getElementById('user-tab__message');
    var favorite_icon = document.getElementById('user-tab__favorite');
    var DM_icon = document.getElementById('user-tab__DM');

    message_icon.style.color = '#909096';
    favorite_icon.style.color = '#909096';
    DM_icon.style.color = '#5bf7fc';
    
    $('.user-message').show();
    $('.detailMessage').remove();
    $('.user-page__main-tab__messages').hide()
    $('.user-page__main-tab__favorites').hide();
    $('.user-page__main-tab__DM').slideDown(400);
  })
});
json.messages @user_messages do |message|
  json.user_id message.user.id
  json.user_name message.user.name
  json.user_image message.user.user_image
  json.id message.id
  json.comment  message.comment
  json.latitude  message.latitude
  json.longitude  message.longitude
  json.created_at message.created_at.strftime("%H:%M - %Y-%m-%d")
end

json.favoritesMessage @user_favorites do |message|
  json.user_id message.user_id
  json.user_name message.user.name
  json.user_image message.user.user_image
  json.id message.id
  json.comment  message.comment
  json.latitude  message.latitude
  json.longitude  message.longitude
  json.created_at message.created_at.strftime("%H:%M - %Y-%m-%d")
end

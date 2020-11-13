json.array! @messages do |message|
  json.id message.id
  json.user_id message.user.id
  json.user_name message.user.name
  json.comment  message.comment
  json.latitude  message.latitude
  json.longitude  message.longitude
  json.created_at message.created_at.strftime("%Y-%m-%d %H:%M")
end
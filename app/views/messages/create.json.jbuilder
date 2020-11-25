json.id @message.id
json.user_id @message.user.id
json.user_name @message.user.name
json.user_image @message.user.user_image
json.comment  @message.comment
json.latitude  @message.latitude
json.longitude  @message.longitude
json.created_at @message.created_at.strftime("%Y-%m-%d %H:%M")
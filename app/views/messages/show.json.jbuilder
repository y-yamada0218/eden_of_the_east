json.user_id @message.user.id
json.user_name @message.user.name
json.comment  @message.comment
json.latitude  @message.latitude
json.longitude  @message.longitude
json.created_at @message.created_at.strftime("%H:%M - %Y-%m-%d")
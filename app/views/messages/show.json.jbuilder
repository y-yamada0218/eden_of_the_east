json.id @message.id
json.user_id @message.user.id
json.user_name @message.user.name
json.comment  @message.comment
json.latitude  @message.latitude
json.longitude  @message.longitude
json.created_at @message.created_at.strftime("%H:%M - %Y-%m-%d")

json.comments @comments do |comment|
  json.user_id comment.user.id
  json.user_name comment.user.name
  json.content comment.content
  json.created_at comment.created_at.strftime("%H:%M - %Y-%m-%d")
end
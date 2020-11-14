class Message < ApplicationRecord
  
  belongs_to :user

  def self.search_from_current_location(my_position,range,search_time)
    messages = Message.where(created_at: search_time.hours.ago..)
    within_messages = []
    my_lat = my_position[0]
    my_lng = my_position[1]

    messages.each do |message|
      message_lat = "#{message.latitude}"
      message_lng = "#{message.longitude}"
      distance = self.search_range(my_lat, my_lng, message_lat, message_lng)
      if distance < range.to_i
        within_messages << message
      end
    end
    return within_messages
  end

  def self.search_range(lat1, lng1, lat2, lng2)
    x1 = lat1.to_f * Math::PI / 180
    y1 = lng1.to_f * Math::PI / 180
    x2 = lat2.to_f * Math::PI / 180
    y2 = lng2.to_f * Math::PI / 180

    radius = 6378.137

    diff_y = (y1 - y2).abs
    calc1 = Math.cos(x2) * Math.sin(diff_y)
    calc2 = Math.cos(x1) * Math.sin(x2) - Math.sin(x1) * Math.cos(x2) * Math.cos(diff_y)  

    numerator = Math.sqrt(calc1 ** 2 + calc2 ** 2)

    denominator = Math.sin(x1) * Math.sin(x2) + Math.cos(x1) * Math.cos(x2) * Math.cos(diff_y)

    degree = Math.atan2(numerator, denominator)
    distance = degree * radius
    return distance.round(6)
    end
end


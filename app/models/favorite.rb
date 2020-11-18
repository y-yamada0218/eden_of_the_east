class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :message

  validates_uniqueness_of :message_id, scope: :user_id 
end

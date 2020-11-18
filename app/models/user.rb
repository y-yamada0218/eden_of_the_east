class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  # geocoded_by :address
  # after_validation :geocode, if: :address_changed?
  has_many :messages, dependent: :destroy
  has_one :search_config, dependent: :destroy
  has_many :comments, dependent: :destroy
end

class AddColumnUserImageToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :user_image, :text
  end
end

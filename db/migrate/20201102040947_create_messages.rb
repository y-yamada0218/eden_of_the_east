class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|

      t.text          :comment, null: false
      t.float         :latitude
      t.float         :longitude
      t.references    :user, foreign_key: true
      t.timestamps
    end
  end
end

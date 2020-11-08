class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|

      t.text          :comment, null: false
      t.decimal       :latitude, precision: 10, scale: 7
      t.decimal       :longitude, precision: 10, scale: 7
      t.references    :user, foreign_key: true
      t.timestamps
    end
  end
end

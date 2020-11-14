class CreateSearchConfigs < ActiveRecord::Migration[6.0]
  def change
    create_table :search_configs do |t|

      t.integer       :range
      t.integer       :time
      t.references    :user, foreign_key: true
      t.timestamps
    end
  end
end

class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.boolean :positive, null: false
      t.integer :liker_id, null: false
      t.integer :likeable_id, null: false
      t.string :likeable_type, null: false
      t.timestamps
    end

    add_index :likes, :liker_id
  end
end

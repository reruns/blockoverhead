class CreateTaggings < ActiveRecord::Migration
  def change
    create_table :taggings do |t|
      t.integer :taggable_id, null: false
      t.integer :tag_id, null: false
      t.text :taggable_type, null: false
      t.timestamps
    end

    add_index :taggings, :tag_id
    add_index :taggings, :taggable_id
  end
end

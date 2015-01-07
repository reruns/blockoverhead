class CreateViews < ActiveRecord::Migration
  def change
    create_table :views do |t|
      t.integer :question_id, null: false
      t.integer :viewer_id, null: false
      t.timestamps
    end

    add_index :views, :question_id
    add_index :views, :viewer_id
  end
end

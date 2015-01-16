class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :asker_id, null: false
      t.text :title, null: false
      t.text :body, null: false
      t.integer :view_count, null: false
      t.integer :score, null: false
      t.timestamps
    end

    add_index :questions, :asker_id
  end
end

class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.integer :asker_id, null: false
      t.string :title, null: false
      t.string :body, null: false
      t.integer :views, null: false
      t.integer :score, null: false
      t.timestamps
    end

    add_index :questions, :asker_id
  end
end

class CreateAnswers < ActiveRecord::Migration
  def change
    create_table :answers do |t|
      t.integer :responder_id, null: false
      t.integer :question_id, null: false
      t.integer :score, null: false
      t.string :body, null: false
      t.boolean :accepted, default: false
      t.timestamps
    end
  end
end

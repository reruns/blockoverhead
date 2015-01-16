class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.text :username, null: false
      t.text :location
      t.text :password_digest, null: false
      t.text :session_id, null: false
      t.timestamps
    end
  end
end

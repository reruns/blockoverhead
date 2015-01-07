class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username, null: false
      t.string :location
      t.string :password_digest, null: false
      t.string :session_id, null: false
      t.timestamps
    end
  end
end

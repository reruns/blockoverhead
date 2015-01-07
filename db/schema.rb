# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150107153324) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "questions", force: true do |t|
    t.integer  "asker_id",   null: false
    t.string   "title",      null: false
    t.string   "body",       null: false
    t.integer  "views",      null: false
    t.integer  "score",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["asker_id"], name: "index_questions_on_asker_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "location"
    t.string   "password_digest", null: false
    t.string   "session_id",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
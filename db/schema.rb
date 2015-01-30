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

ActiveRecord::Schema.define(version: 20150114154722) do

  create_table "answers", force: true do |t|
    t.integer  "responder_id",                 null: false
    t.integer  "question_id",                  null: false
    t.integer  "score",                        null: false
    t.text     "body",                         null: false
    t.boolean  "accepted",     default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "answers", ["question_id"], name: "index_answers_on_question_id", using: :btree
  add_index "answers", ["responder_id"], name: "index_answers_on_responder_id", using: :btree

  create_table "comments", force: true do |t|
    t.integer  "commentable_id",   null: false
    t.text     "commentable_type", null: false
    t.integer  "author_id",        null: false
    t.text     "body",             null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["author_id"], name: "index_comments_on_author_id", using: :btree
  add_index "comments", ["commentable_id"], name: "index_comments_on_commentable_id", using: :btree

  create_table "images", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "img_file_name"
    t.string   "img_content_type"
    t.integer  "img_file_size"
    t.datetime "img_updated_at"
  end

  create_table "likes", force: true do |t|
    t.boolean  "positive",      null: false
    t.integer  "liker_id",      null: false
    t.integer  "likeable_id",   null: false
    t.text     "likeable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "likes", ["liker_id"], name: "index_likes_on_liker_id", using: :btree

  create_table "questions", force: true do |t|
    t.integer  "asker_id",   null: false
    t.text     "title",      null: false
    t.text     "body",       null: false
    t.integer  "view_count", null: false
    t.integer  "score",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "questions", ["asker_id"], name: "index_questions_on_asker_id", using: :btree

  create_table "taggings", force: true do |t|
    t.integer  "taggable_id",   null: false
    t.integer  "tag_id",        null: false
    t.text     "taggable_type", null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id", using: :btree
  add_index "taggings", ["taggable_id"], name: "index_taggings_on_taggable_id", using: :btree

  create_table "tags", force: true do |t|
    t.text     "title",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.text     "username",            null: false
    t.text     "location"
    t.text     "password_digest",     null: false
    t.text     "session_id",          null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  create_table "views", force: true do |t|
    t.integer  "question_id", null: false
    t.integer  "viewer_id",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "views", ["question_id"], name: "index_views_on_question_id", using: :btree
  add_index "views", ["viewer_id"], name: "index_views_on_viewer_id", using: :btree

end

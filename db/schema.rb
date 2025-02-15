# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_08_12_013917) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.money "price", scale: 2
    t.string "img_url"
    t.text "details"
    t.integer "raffle_id"
    t.string "category"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "raffles", force: :cascade do |t|
    t.integer "host_id"
    t.money "remaining_funding", scale: 2
    t.text "purpose"
    t.datetime "end_time"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_raffles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "raffle_id", null: false
    t.money "bought_shares", scale: 2
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["raffle_id"], name: "index_user_raffles_on_raffle_id"
    t.index ["user_id"], name: "index_user_raffles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "wins", force: :cascade do |t|
    t.integer "user_id"
    t.bigint "raffle_id", null: false
    t.string "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["raffle_id"], name: "index_wins_on_raffle_id"
  end

  add_foreign_key "user_raffles", "raffles"
  add_foreign_key "user_raffles", "users"
  add_foreign_key "wins", "raffles"
end

class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.money :price
      t.string :img_url
      t.text :details
      t.integer :raffle_id
      t.string :category
      t.timestamps
    end
  end
end

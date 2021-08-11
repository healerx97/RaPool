class CreateRaffles < ActiveRecord::Migration[6.1]
  def change
    create_table :raffles do |t|
      t.integer :product_id
      t.integer :host_id
      t.integer :winner_id
      t.money :remaining_funding
      t.timestamps
    end
  end
end

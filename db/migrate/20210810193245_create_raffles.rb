class CreateRaffles < ActiveRecord::Migration[6.1]
  def change
    create_table :raffles do |t|
      t.integer :host_id
      t.money :remaining_funding
      t.datetime :end_time
      t.timestamps
    end
  end
end

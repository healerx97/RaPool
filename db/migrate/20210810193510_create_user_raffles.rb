class CreateUserRaffles < ActiveRecord::Migration[6.1]
  def change
    create_table :user_raffles do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :raffle, null: false, foreign_key: true
      t.money :bought_shares
      t.timestamps
    end
  end
end

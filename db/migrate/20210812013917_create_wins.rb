class CreateWins < ActiveRecord::Migration[6.1]
  def change
    create_table :wins do |t|
      t.integer :product_id
      t.integer :user_id
      t.belongs_to :raffle, null: false, foreign_key: true
      t.string :status
      t.timestamps
    end
  end
end

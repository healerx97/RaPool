class Win < ApplicationRecord
    belongs_to :raffle
    belongs_to :user
    validates :raffle_id, uniqueness: true
    validates :user_id, uniqueness: { scope: :raffle_id, messsage: "prevent double"}
end

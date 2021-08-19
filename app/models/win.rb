class Win < ApplicationRecord
    belongs_to :raffle
    belongs_to :user
    validates :user, uniqueness: { scope: :raffle, messsage: "prevent double"}
end

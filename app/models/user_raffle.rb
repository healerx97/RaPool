class UserRaffle < ApplicationRecord
  belongs_to :user
  belongs_to :raffle
end

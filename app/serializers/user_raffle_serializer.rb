class UserRaffleSerializer < ActiveModel::Serializer
  attributes :id, :bought_shares
  has_one :user
  has_one :raffle
end

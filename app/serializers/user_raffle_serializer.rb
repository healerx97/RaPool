class UserRaffleSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :raffle
end

class RaffleSerializer < ActiveModel::Serializer
  attributes :id, :host_id, :remaining_funding
  has_one :win
  has_one :product
end

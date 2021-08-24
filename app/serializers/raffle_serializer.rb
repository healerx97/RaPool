class RaffleSerializer < ActiveModel::Serializer
  attributes :id, :host_id, :remaining_funding, :purpose, :end_time, :host
  has_one :win
  has_one :product
  has_many :users
  def host
    self.object.host_user
  end
end

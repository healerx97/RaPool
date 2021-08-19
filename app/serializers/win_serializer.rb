class WinSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id
  belongs_to :raffle
end

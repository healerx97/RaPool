class WinSerializer < ActiveModel::Serializer
  attributes :id, :status, :user_id, :winner
  belongs_to :raffle
  belongs_to :user

  def winner
    self.object.user
  end
end

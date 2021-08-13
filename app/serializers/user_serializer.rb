class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
  has_one :win
  has_many :raffles
end

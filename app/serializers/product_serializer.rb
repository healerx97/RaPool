class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :img_url, :details
end

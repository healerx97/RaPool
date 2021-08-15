class Raffle < ApplicationRecord
    has_many :user_raffles, dependent: :destroy
    has_many :users, through: :user_raffles
    belongs_to :host, class_name: "User"
    has_one :win, dependent: :destroy
    has_one :product, dependent: :destroy
    def winner
        User.find_by(id: self.winner_id)
    end

    def host_user
        User.find_by(id: self.host_id)
    end
    # def product
    #     Product.find_by(id: self.product_id)
    # end
end

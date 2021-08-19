class User < ApplicationRecord
    has_secure_password

    has_many :user_raffles, dependent: :destroy
    has_many :raffles, through: :user_raffles

    has_many :my_raffles, foreign_key: :host_id, class_name: "Raffle"
    has_one :win, dependent: :destroy
    validates :email, uniqueness: true

end

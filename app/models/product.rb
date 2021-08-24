class Product < ApplicationRecord
    belongs_to :raffle
    validates :category, exclusion: { in: ['all'],
        message: "Please select a category." }
end

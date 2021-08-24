require 'faker'

puts 'destroying data'

Win.destroy_all
Win.reset_pk_sequence
Product.destroy_all
Product.reset_pk_sequence
UserRaffle.destroy_all
UserRaffle.reset_pk_sequence
User.destroy_all
User.reset_pk_sequence
Raffle.destroy_all
Raffle.reset_pk_sequence


10.times do
    User.create(username: Faker::Internet.username, email: Faker::Internet.email, password: "asdf")
end

20.times do
    Raffle.create(host_id: rand(1..10), remaining_funding: rand(0..100))
end

Raffle.all.each do |r|
    Product.create(raffle_id: r.id, name: Faker::Internet.username, price: rand(20..100), img_url: "https://picsum.photos/200/300", details: rand(0..5), category: "electronics")
end
puts "creating user data"

User.all.each do |u|
    UserRaffle.create(user_id: u.id, raffle_id: rand(1..20), bought_shares: rand(1..20))
    UserRaffle.create(user_id: u.id, raffle_id: rand(1..20), bought_shares: rand(1..20))
    UserRaffle.create(user_id: u.id, raffle_id: rand(1..20), bought_shares: rand(1..20))
end

puts "done"
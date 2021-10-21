# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'


Place.destroy_all

puts "Seeding the database..."

10.times do
  Place.create(name: Faker::Restaurant.name, location: Faker::Address.full_address)
end

puts "Seeded!"
puts "#{Place.all.count} places added!"

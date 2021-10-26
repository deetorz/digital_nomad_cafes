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

Place.create!(
  address: '〒150-0002 東京都渋谷区渋谷２丁目２４−12',
  name: 'WeWork Shibuya Scramble Square'
)

Place.create!(
  address: '〒150-0041 東京都渋谷区神南１丁目６−5',
  name: 'the Hive Jinnan'
)

Place.create!(
  address: '〒105-0001 東京都港区虎ノ門１丁目１７−1',
  name: 'CIC Tokyo'
)

Place.create!(
  address: '〒153-0063 東京都目黒区目黒２丁目１１−3',
  name: 'Impact Hub Tokyo'
)

puts "Seeded!"
puts "#{Place.all.count} places added!"

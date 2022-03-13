require 'faker'

Place.destroy_all

location_data = File.read('dataset.json')
locations = JSON.parse(location_data)
locations.each do |location|
  next if location["locationName"].nil? || location["address"].nil?
  Place.create!( name: location["locationName"], address: location["address"])
end

p Place.count

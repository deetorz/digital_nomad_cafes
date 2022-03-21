require 'faker'

Place.destroy_all

location_data = File.read('dataset.json')
locations = JSON.parse(location_data)
locations.each do |location|
  wifi = false
  power = false
  next if location["locationName"].nil? || location["address"].nil? || location["address"] == ""
  amenities = [
    [
      "Wifi:◎",
      "Wifi: ◎"
    ],
    [
      "Power:◎",
      "Power: ◎"
    ]
  ]
  amenities[0].each do |phrase|
    next if wifi
    wifi = true if location["caption"].include? phrase
  end

  amenities[1].each do |phrase|
    next if power
    power = true if location["caption"].include? phrase
  end
  Place.create!( name: location["locationName"], address: location["address"], wifi: wifi, power: power)

end

p Place.count

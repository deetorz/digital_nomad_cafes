class Place < ApplicationRecord
  def initialize(name, location)
    @name = name
    @location = location
  end
end

class PlacesController < ApplicationController
  def index
    @places = Place.all

    # the `geocoded` scope filters only places with coordinates (latitude & longitude)
    @markers = @places.geocoded.map do |place|
      {
        lat: place.latitude,
        lng: place.longitude
      }
    end
  end
end

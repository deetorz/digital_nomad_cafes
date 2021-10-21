class Place < ApplicationRecord
  include ActionView::Helpers::TextHelper
  validates :name, presence: true
  validates :location, presence: true
end

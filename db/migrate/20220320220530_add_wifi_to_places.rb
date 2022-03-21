class AddWifiToPlaces < ActiveRecord::Migration[6.1]
  def change
    add_column :places, :wifi, :boolean, default: false
  end
end

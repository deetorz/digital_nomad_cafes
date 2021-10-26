class ChangeLocationToAddress < ActiveRecord::Migration[6.1]
  def change
    rename_column :places, :location, :address
  end
end

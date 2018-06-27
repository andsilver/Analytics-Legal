class Laboral::Litigant < ApplicationRecord
  self.table_name = 'Litigantes'
  establish_connection LABORAL_DB

  def as_json(options = {})
    {
      id: self.Rut,
      text: "#{self.Nombre} (#{self.Rut})"
    }
  end
end
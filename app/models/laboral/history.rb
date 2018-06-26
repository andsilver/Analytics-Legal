class Laboral::History < ApplicationRecord
  self.table_name = 'Historias'
  establish_connection LABORAL_DB

  def processed_date
    DateTime.strptime(read_attribute('Fecha Tramite').to_s, '%s')
  end
end
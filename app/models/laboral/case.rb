class Laboral::Case < ApplicationRecord
  self.table_name = 'Causas'
  establish_connection LABORAL_DB

  def processed_date
    DateTime.strptime(read_attribute('Fecha Ingreso').to_s, '%s')
  end

  def serializable_hash(options = {})
    super.merge(
      'Fecha Ingreso' => self.read_attribute('Fecha Ingreso').to_i * 1000
    )
  end
end
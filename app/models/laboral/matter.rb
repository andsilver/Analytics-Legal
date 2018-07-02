class Laboral::Matter < ApplicationRecord
  self.table_name = 'Materias'
  establish_connection LABORAL_DB
end
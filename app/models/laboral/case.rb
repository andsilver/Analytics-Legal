class Laboral::Case < ApplicationRecord
  self.table_name = 'Causas'
  establish_connection LABORAL_DB
end
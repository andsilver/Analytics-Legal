require 'rails_helper'

RSpec.describe Cache::TopDefendantRutsCache do
  describe '#user_data' do
    let(:whitelisted_litigators) do
      create(:litigant, Rut: '0-1')
      create(:litigant, Rut: '0-2')
    end

    it 'returns data' do
      # binding.pry
    end
  end
end
require 'rails_helper'

RSpec.describe Cache::TopDefendantRutsCache do
  around do |example|
    Laboral::Litigant.connection.execute('SET foreign_key_checks = 0;')
    Laboral::Case.connection.execute('SET foreign_key_checks = 0;')
    example.run
    Laboral::Litigant.connection.execute('SET foreign_key_checks = 1;')
    Laboral::Case.connection.execute('SET foreign_key_checks = 1;')
  end

  describe '#user_data trivial case' do
    before do
      litigant1 = create(:litigant, Rut: '0-1')
      litigant2 = create(:litigant, Rut: '0-2')
      user = create(:user)
      create(:whitelisted_litigator, user: user, rut: '0-1')
      create(:whitelisted_litigator, user: user, rut: '0-2')
      create(:case, Id: litigant1.Id)
      create(:case, Id: litigant2.Id)
    end

    it 'returns data' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data']).not_to be_nil
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'][0]['percentage']).to eq("50.0%")
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'][1]['percentage']).to eq("50.0%")
    end
  end

  describe '#filter 0-0 and normal ruts' do
    before do
      litigant1 = create(:litigant, Rut: '0-0')
      litigant2 = create(:litigant, Rut: '0-0')
      litigant3 = create(:litigant, Rut: '8-0982343')
      litigant4 = create(:litigant, Rut: '9-6877245')
      litigant5 = create(:litigant, Rut: '8-0982343')
      user = create(:user)
      create(:whitelisted_litigator, user: user, rut: '0-0')
      create(:whitelisted_litigator, user: user, rut: '0-0')
      create(:whitelisted_litigator, user: user, rut: '8-0982343')
      create(:whitelisted_litigator, user: user, rut: '9-6877245')
      create(:case, Id: litigant1.Id)
      create(:case, Id: litigant2.Id)
      create(:case, Id: litigant3.Id)
      create(:case, Id: litigant4.Id)
      create(:case, Id: litigant5.Id)
    end

    it 'keeps all 0-0 litigants' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'].pluck('rut').count('0-0')).to eq(2)
    end

    it 'filters repetitve litigants with normal ruts' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'].pluck('rut').count('8-0982343')).to eq(1)
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'].pluck('rut').count('9-6877245')).to eq(1)
    end
  end

  describe '#counts cases properly' do
    before do
      litigant1 = create(:litigant, Rut: '0-0')
      litigant2 = create(:litigant, Rut: '0-0')
      litigant3 = create(:litigant, Rut: '8-0982343')
      litigant4 = create(:litigant, Rut: '9-6877245')
      litigant5 = create(:litigant, Rut: '8-0982343')
      litigant5 = create(:litigant, Rut: '7-9872431')
      user = create(:user)
      create(:whitelisted_litigator, user: user, rut: '0-0')
      create(:whitelisted_litigator, user: user, rut: '0-0')
      create(:whitelisted_litigator, user: user, rut: '8-0982343')
      create(:whitelisted_litigator, user: user, rut: '9-6877245')
      create(:whitelisted_litigator, user: user, rut: '7-9872431')
      create(:case, Id: litigant1.Id)
      create(:case, Id: litigant1.Id)
      create(:case, Id: litigant2.Id)
      create(:case, Id: litigant3.Id)
      create(:case, Id: litigant4.Id)
      create(:case, Id: litigant5.Id)
    end

    it 'counts total' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['total']).to eq(6)
    end

    it 'counts cases for one rut' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'][0]['count']).to eq(2)
    end

    it 'count percentage' do
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'].last['percentage']).to eq("16.667%")
      expect(JSON.parse(described_class.send(:cacheable_json, User.last))['data'][0]['percentage']).to eq("33.333%")
    end
  end

  # describe '#division in quarters' do
  #   let!(:litigant1) { create(:litigant, Rut: '1-987123') }
  #   let!(:litigant2) { create(:litigant, Rut: '1-987123') }
  #   # let!(:user) { create(:user) }
  #   before do
  #     print 1
  #     create(:whitelisted_litigator, user: user, rut: '1-987123')
  #     print 2
  #     create(:case, Id: litigant1.Id, :'Fecha Ingreso' => 1531869783)
  #     print 3
  #     create(:case, Id: litigant1.Id, :'Fecha Ingreso' => 1531897823)
  #     print 4
  #     create(:case, Id: litigant1.Id, :'Fecha Ingreso' => 1594562876)
  #     print 5
  #     create(:case, Id: litigant2.Id, :'Fecha Ingreso' => 1490587263)
  #     print 6
  #     create(:case, Id: litigant2.Id, :'Fecha Ingreso' => 1516784098)
  #     print 7
  #     create(:case, Id: litigant2.Id, :'Fecha Ingreso' => 1594569825)
  #     print 8
  #   end

  #   it 'returns data' do
  #     expect(JSON.parse(described_class.send(:ruts_hash, '1-987123', [litigant1, litigant2]))).to eq()
  #   end
  # end
end
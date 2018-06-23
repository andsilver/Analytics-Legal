require 'rails_helper'

RSpec.describe Users::RegistrationsController, type: :controller do
  describe 'PUT /users' do
    before do
      @request.env["devise.mapping"] = Devise.mappings[:user]
    end

    context 'user is commercial' do
      before { sign_in(create(:commercial_client_user, password: '12345678')) }

      it 'does not allow user to change his email' do
        expect { put :update, params: { user: { email: 'foo@bar.com', current_password: '12345678' }} }.to(
          change { User.last.email }
        )
      end
    end

    context 'user is client' do
      before { sign_in(create(:client_user, password: '12345678')) }

      it 'does not allow user to change his email' do
        expect { put :update, params: { email: 'foo@bar.com', current_password: '12345678' } }.not_to(
          change { User.last.email }
        )
      end
    end
  end
end

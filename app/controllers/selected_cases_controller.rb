class SelectedCasesController < ApplicationController
  include Pundit

  def batch_create
    params[:cases].each do |kase|
      SelectedCase.where(user_id: params[:user_id], crr_idcausa: kase['crr_idcausa']).first_or_initialize.tap do |existingCase|
        existingCase.crr_idcausa_type = kase['crr_idcausa_type']
        existingCase.save
      end
    end
  end
end
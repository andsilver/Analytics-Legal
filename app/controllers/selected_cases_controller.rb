class SelectedCasesController < ApplicationController
  include Pundit

  def batch_create
    params[:cases].each do |kase|
      SelectedCase.create(
        user_id: params[:user_id],
        crr_idcausa: kase['crr_idcausa'],
        crr_idcausa_type: kase['crr_idcausa_type']
      )
    end
  end
end
class CasesOnUsersRutsWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'cache'

  def perform(user_id = nil)
    user_id ? Cache::CasesOnUsersRutsCache.save(user_id) : Cache::CasesOnUsersRutsCache.save_all
  end
end
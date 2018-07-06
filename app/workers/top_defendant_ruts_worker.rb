class TopDefendantRutsWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'cache'

  def perform(user_id = nil)
    user_id ? Cache::TopDefendantRutsCache.save(user_id) : Cache::TopDefendantRutsCache.save_all
  end
end
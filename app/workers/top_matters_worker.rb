class TopMattersWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'cache'

  def perform(user_id = nil)
    user_id ? Cache::TopMattersCache.save(user_id) : Cache::TopMattersCache.save_all
  end
end

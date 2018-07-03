class MattersCacheWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'cache'

  def perform(user_id = nil)
    user_id ? Cache::MattersCache.new.save(User.find(user_id)) : Cache::MattersCache.new.save_all
  end
end

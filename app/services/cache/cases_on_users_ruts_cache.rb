class Cache::CasesOnUsersRutsCache
  REDIS_KEY = 'deepleagal_cache:cases_on_users_ruts'.freeze

  class << self
    def save_all
      User.all.find_each { |user| save(user.id) }

      true
    end

    def save(user_id)
      $redis.hset(REDIS_KEY, user_id, cacheable_json(User.find(user_id)))

      true
    end

    def get(user_id)
      JSON.parse($redis.hget(REDIS_KEY, user_id.to_s), symbolize_names: true)
    end

    private

    def cacheable_json(user)
      whitelisted_litigators_ids = Laboral::Litigant.where(
        Rut: user.whitelisted_litigators.pluck(:rut)
      ).pluck(:id)

      {
        data: Laboral::Case.where(Id: whitelisted_litigators_ids),
        updated_at: Time.now.to_i
      }.to_json
    end
  end
end
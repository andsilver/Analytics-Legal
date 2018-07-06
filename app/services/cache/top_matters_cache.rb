class Cache::TopMattersCache
  REDIS_KEY = 'deepleagal_cache:top_matters'.freeze

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
      ids = Laboral::Litigant.where(Rut: user.whitelisted_litigators.pluck(:rut)).pluck(:id)

      return if ids.empty?

      {
        data: matters(ids).each_with_object([]) { |(k, v), memo| memo << { label: k, value: v } },
        updated_at: Time.now.to_i
      }.to_json
    end

    def matters(ids)
      cached_matters_array = matters_array(ids)
      if cached_matters_array.size > 10
        top_10 = cached_matters_array[0...10].to_h

        others_count = cached_matters_array[10..-1].reduce(0) { |acc, m| acc += m.last }

        top_10.merge('Otras' => others_count)
      else
        cached_matters_array[0...10].to_h
      end
    end

    def matters_array(allowed_litigator_ids)
      Laboral::Matter
        .where(Id: allowed_litigator_ids)
        .pluck(:'Glosa de Materia')
        .group_by(&:itself)
        .map { |k, v| [k, v.count] }
    end
  end
end
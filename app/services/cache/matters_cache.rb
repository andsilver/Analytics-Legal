class Cache::MattersCache
  TOP_10_MATTERS_KEY = 'top-10-matters'.freeze

  def initialize(logger = nil)
    @logger = logger || Logger.new('log/matters_cache.log')
  end

  def save_all
    User.all.find_each { |user| save(user) }

    true
  end

  def save(user)
    @logger.info("Processing user ##{user.id}")
    $redis.hset(TOP_10_MATTERS_KEY, user.id, matters_json(user))

    true
  end

  def get(user_id)
    $redis.hget(TOP_10_MATTERS_KEY, user_id.to_s)
  end

  private

  def matters_json(user)
    allowed_litigator_ids = Laboral::Litigant.where(
      Rut: user.whitelisted_litigators.pluck(:rut)
    ).pluck(:id)

    return if allowed_litigator_ids.empty?

    cached_matters_array = matters_array(allowed_litigator_ids)

    matters = if cached_matters_array.size > 10
      top_10 = cached_matters_array[0...10].to_h

      others_count = cached_matters_array[10..-1].reduce(0) { |acc, m| acc += m.last }

      top_10.merge('Otras' => others_count)
    else
      cached_matters_array[0...10].to_h
    end

    matters
      .each_with_object([]) { |(k, v), memo| memo << { label: k, value: v} }
      .to_json
  end

  def matters_array(allowed_litigator_ids)
    Laboral::Matter
      .where(Id: allowed_litigator_ids)
      .pluck(:'Glosa de Materia')
      .group_by(&:itself)
      .map { |k,v| [k, v.count] }
  end
end
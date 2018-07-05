class Cache::CasesCache
  COUNT_CASES_BY_RUT_KEY = 'count-cases-by-rut'.freeze
  COUNT_CASES_BY_RUT_UPDATED_KEY = 'count-cases-by-rut-updated'.freeze
  COUNT_NUMBER_OF_CASES_KEY = 'number-of-cases'.freeze

  def initialize(logger = nil)
    @logger = logger || Logger.new('log/cases_cache.log')
  end

  def save_all
    User.all.find_each { |user| save(user) }

    true
  end

  def save(user)
    @logger.info("Processing user ##{user.id}")
    cases_by_rut_hash = count_cases_by_rut(user)
    number_of_cases = count_number_of_cases(cases_by_rut_hash)

    $redis.hset(COUNT_CASES_BY_RUT_KEY, user.id, cases_by_rut_with_percentage(cases_by_rut_hash, number_of_cases).to_json)
    $redis.hset(COUNT_CASES_BY_RUT_UPDATED_KEY, user.id, Time.now.to_i)
    $redis.hset(COUNT_NUMBER_OF_CASES_KEY, user.id, number_of_cases)

    true
  end

  def get(user_id)
    $redis.hget(COUNT_CASES_BY_RUT_KEY, user_id.to_s)
  end

  def get_updated_at(user_id)
    $redis.hget(COUNT_CASES_BY_RUT_UPDATED_KEY, user_id.to_s)
  end

  def get_number_of_cases(user_id)
    $redis.hget(COUNT_NUMBER_OF_CASES_KEY, user_id.to_s)
  end

  private

  def count_cases_by_rut(user)
    whitelisted_litigators = user.whitelisted_litigators
    allowed_litigators = Laboral::Litigant.where(
      Rut: whitelisted_litigators.pluck(:rut)
    )

    return if allowed_litigators.empty?

    allowed_litigators.group_by { |l| l.Rut }.each_with_object([]) do |(rut, litigators), memo|
      memo << {
        rut: rut,
        count: Laboral::Case.where(Id: litigators.pluck(:Id)).count,
        name: litigators.first.Nombre
      }
    end
  end

  def count_number_of_cases(cases_by_rut_hash)
    return 0 unless cases_by_rut_hash.present?

    cases_by_rut_hash.reduce(0) do |acc, kase|
      acc += kase[:count]
    end
  end

  def cases_by_rut_with_percentage(cases_hash, number_of_cases)
    return unless cases_hash.present?

    cases_hash.map do |kase|
      kase.merge(percentage: "#{(kase[:count].to_f / number_of_cases * 100).round(1)}%")
    end
  end
end
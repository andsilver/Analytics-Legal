Raven.configure do |config|
  config.dsn = 'https://4818928d18ab42fa8369fcb47dc86920:8f73779d217d494c8bb27195b38ea5c8@sentry.io/1243406'
  config.sanitize_fields = Rails.application.config.filter_parameters.map(&:to_s)
  config.environments = %w[production, staging]
end
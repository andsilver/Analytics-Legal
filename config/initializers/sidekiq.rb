schedule_file = "config/schedule.yml"

Sidekiq.configure_server do |config|
  config.redis = { url: Rails.application.secrets.redis_url || "redis://localhost:6379", id: nil }
end

Sidekiq.configure_client do |config|
  config.redis = { url: Rails.application.secrets.redis_url || "redis://localhost:6379", id: nil }
end

if File.exist?(schedule_file) && Sidekiq.server?
  Sidekiq::Cron::Job.load_from_hash YAML.load_file(schedule_file)
end
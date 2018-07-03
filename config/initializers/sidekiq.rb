Sidekiq.configure_server do |config|
  config.redis = { url: Rails.application.secrets.redis_url || "redis://localhost:6379" }
end

Sidekiq.configure_client do |config|
  config.redis = { url: Rails.application.secrets.redis_url || "redis://localhost:6379" }
end
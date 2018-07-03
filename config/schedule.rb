set :output, "/var/www/deeplegal/shared/log/cron_log.log"

every 15.minutes do
  runner "Cache::MattersCache.new(Logger.new('/var/www/deeplegal/shared/log/matters_cache_cron.log')).save_all"
end

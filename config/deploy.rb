lock "~> 3.11.0"

set :application, "deeplegal"
set :repo_url, "git@github.com:storrealba-dl/deeplegal.git"
# set :user, "linakirsanova"
set :user, "danil"

# Default branch is :master
ask :branch, 'master'
set :deploy_to, "/var/www/deeplegal"

# Default value for :linked_files is []
append :linked_files, "config/database.yml", "config/secrets.yml", "config/laboral_database.yml",
                      "public/visit-sequences.csv"

# Default value for linked_dirs is []
append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system",
                     "public/assets/fonts", "public/packs"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for keep_releases is 5
set :keep_releases, 5

set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
set :puma_access_log, "#{release_path}/log/puma.error.log"
set :puma_error_log,  "#{release_path}/log/puma.access.log"
set :puma_preload_app, true
set :puma_worker_timeout, nil
set :puma_init_active_record, true

set :sidekiq_queue, 'cache'

before "deploy:assets:precompile", "deploy:yarn_install"

namespace :deploy do
  desc 'Run rake yarn:install'
  task :yarn_install do
    on roles(:web) do
      within release_path do
        execute("cd #{release_path} && yarn install")
      end
    end
  end
end

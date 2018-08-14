set :rbenv_ruby, '2.4.3'
# Default branch is :staging
ask :branch, 'staging'

server "35.185.71.179", user: "linakirsanova", roles: %w{web app db}
# production.rb
set :rails_env, :production

# Настраиваем ssh до сервера
server "<--input production host-->", :app, :web, :db, :primary => true

# Авторизационные данные
set :user, "sea_fight"
set :group, "sea_fight"
set :password, '<--password-->'
set :keep_releases, 5
set :repository, 'prod'

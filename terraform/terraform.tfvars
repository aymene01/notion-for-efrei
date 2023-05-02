postgres = {
  database_name = "database"
  password      = "password"
  username      = "user"
  port          = 5432
}

docker_container = {
  restart  = "unless-stopped"
  hostname = "efrei-app-api-postgres"
  name     = "efrei-app-api-db"
}

docker_image = "postgres:latest"

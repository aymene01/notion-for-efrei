resource "docker_container" "database" {
  name     = var.docker_container.name
  image    = docker_image.postgres.image_id
  hostname = var.docker_container.hostname
  restart  = var.docker_container.restart
  ports {
    internal = var.postgres.port
    external = var.postgres.port
  }
  env = [
    "POSTGRES_USER=${var.postgres.username}",
    "POSTGRES_PASSWORD=${var.postgres.password}",
    "POSTGRES_DB=${var.postgres.database_name}"
  ]
}

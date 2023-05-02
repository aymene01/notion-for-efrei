variable "postgres" {
  type = object({
    username      = string
    password      = string
    database_name = string
    port          = number
  })
  default = {
    username      = "user"
    password      = "password"
    database_name = "database"
    port          = 5432
  }
}

variable "docker_container" {
  type = object({
    name     = string
    hostname = string
    restart  = string
  })
}

variable "docker_image" {
  type = string
}


terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "<= 3.43"
    }
  }
}

provider "google" {
  credentials = file(var.credentials_file)

  project = var.project
  region  = var.region
  zone    = var.zone
}


# ==== VPC network definition ==== #

module "vpc_network" {
  source           = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/vpc_network?ref=v0.0.2"
  vpc_network_name = var.vpc_network_name
  vpc_description  = "VPC network created to house the CSQL instance private IP."
  routing_mode     = var.routing_mode
}

# ==== Allocated IP range definition ==== #

module "allocated_ip_address_range" {
  source                    = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/allocated_ip_address_range?ref=v0.0.2"
  name                      = var.allocated_ip_address_range_name
  description               = "Allocation for the Cloud SQL instance."
  prefix_length             = var.prefix_length
  address_type              = "INTERNAL"
  purpose                   = "VPC_PEERING"
  associated_vpc_network_id = module.vpc_network.vpc_network_id
}

module "private_connection" {
  source                      = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/private_connection?ref=v0.0.2"
  associated_vpc_network_id   = module.vpc_network.vpc_network_id
  allocated_ip_address_ranges = [module.allocated_ip_address_range.name]
}

# ==== Cloud SQL Postgres instance ==== #

module "private_postgres_instance" {
  depends_on       = [module.private_connection]
  source           = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/cloud_sql_postgres?ref=v0.0.2"
  name             = var.instance_name
  database_version = var.postgres_version
  cloud_sql_region = var.sql_region
  # We are disabling the Public IP from the Cloud SQL instance as
  # we only want to access it through private IP address.
  ipv4_enabled   = false
  vpc_network_id = module.vpc_network.vpc_network_id
}

# ==== Cloud SQL User ==== #

module "cloud_sql_user" {
  source = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/cloud_sql_user?ref=v0.0.2"

  sql_user_name           = var.sql_user_name
  cloud_sql_instance_name = module.private_postgres_instance.name
  # For PostgreSQL instances, we need to define a password in order to successfully create a new user.
  sql_user_password = var.sql_user_password
}

# ==== Cloud SQL Database ==== #

module "cloud_sql_database" {
  depends_on    = [module.private_postgres_instance]
  source        = "git::https://github.com/crodriguezconde/terraform-google-cloud-sql.git//modules/cloud_sql_database?ref=v0.0.2"
  database_name = var.database_name
  instance_name = module.private_postgres_instance.name
}

# ==== Serverless VPC connector ==== #

module "svpc_connector" {
  depends_on     = [module.private_connection]
  source         = "git::https://github.com/bhidalto/terraform-serverless-vpc-connector.git//modules/serverless_vpc_connector?ref=v0.0.2"
  name           = var.svpc_connector_name
  network        = var.vpc_network_name
  ip_cidr_range  = var.ip_cidr_range
  region         = var.region
  min_throughput = var.min_throughput
  max_throughput = var.max_throughput
}

resource "google_storage_bucket" "bucket" {
  name = "appengine-sources"
}

data "archive_file" "server" {
  type        = "zip"
  source_dir  = ".."
  excludes    = ["node_modules", "terraform", "tests", "logs", ".git"]
  output_path = "sources/my-budget-pipauls-server-${timestamp()}.zip"
}

resource "google_storage_bucket_object" "object" {
  name   = "my-budget-builder-server-${timestamp()}.zip"
  bucket = google_storage_bucket.bucket.name
  source = data.archive_file.server.output_path
}

resource "google_app_engine_standard_app_version" "server" {
  version_id = "v1"
  service    = "server"
  runtime    = "nodejs14"


  deployment {
    zip {
      source_url = "https://storage.googleapis.com/${google_storage_bucket.bucket.name}/${google_storage_bucket_object.object.name}"
    }
  }

  env_variables = {
    port        = "8080"
    NODE_ENV    = "production"
    DB_USER     = var.sql_user_name
    DB_PASSWORD = var.sql_user_password
    DB_DATABASE = var.database_name
    DB_SOCKET   = "/cloudsql/${module.private_postgres_instance.connection_name}"
  }

  delete_service_on_destroy = true

  vpc_access_connector {
    name = module.svpc_connector.id
  }

}


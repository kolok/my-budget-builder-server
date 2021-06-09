### Global Variables
variable "project" {}
variable "credentials_file" {}
variable "region" {
  default = "europe-west1"
}
variable "zone" {
  default = "europe-west1-b"
}


### Variables declaration for VPC network
variable "vpc_network_name" {}
variable "routing_mode" {}

### Variables declaration for IP address allocation range
variable "allocated_ip_address_range_name" {}
variable "prefix_length" {}

### Variables declaration for Cloud SQL instance
variable "instance_name" {}
variable "sql_region" {}
variable "postgres_version" {}


## Variables declaration for Cloud SQL user
variable "sql_user_name" {}
variable "sql_user_password" {}

## Variables declaration for Cloud SQL Database
variable "database_name" {}

# Variables for SVPC connector block
variable "svpc_connector_name" {}
variable "ip_cidr_range" {}
variable "min_throughput" {}
variable "max_throughput" {}
# /Variables for SVPC connector block

# Variables for Standard Module
variable "service_version" {}
variable "service" {}
variable "runtime" {}
variable "threadsafe" {}
variable "instance_class" {}

project          = "mybudgetpipauls"
credentials_file = "/Users/nicolasoudard/.gcp/mybudgetpipauls-3bbb38646a6c.json"

### Variables definition for VPC network
vpc_network_name = "private-csql-vpc-postgres"
routing_mode     = "GLOBAL"

### Variables definition for IP address allocation range
allocated_ip_address_range_name = "private-ip-allocation-postgres"
prefix_length                   = 16

### Variables definition for Cloud SQL instance
instance_name    = "pipaulsdb"
sql_region       = "europe-west1"
postgres_version = "POSTGRES_13"

## Variables definition for Cloud SQL user
sql_user_name = "pipauls"

## Variables declaration for Cloud SQL Database
database_name = "pipauls"

# Variables for SVPC connector
svpc_connector_name = "postgres-svpc-euw"
ip_cidr_range       = "10.0.8.0/28"
region              = "europe-west1"
min_throughput      = 200
max_throughput      = 300

# Variables for Standard Module
service_version = "v0"
service         = "server"
runtime         = "nodejs14"
threadsafe      = true
instance_class  = "F1"

# Variables for Zip Module
zip = {
  source_url  = "https://storage.googleapis.com/appengine-server-sources/my-budget-builder-server.zip"
  files_count = null
}

# Variables for Entrypoint block
entrypoint = {
  shell = "python main.py"
}

# Variables for Automatic Scaling module
automatic_scaling = {
  max_concurrent_requests = 10,
  max_idle_instances      = 10,
  max_pending_latency     = "1s",
  min_idle_instances      = 3,
  min_pending_latency     = "0.01s",
  standard_scheduler_settings = {
    target_cpu_utilization        = 0.6,
    target_throughput_utilization = 0.6,
    min_instances                 = 1,
    max_instances                 = 3
  }
}

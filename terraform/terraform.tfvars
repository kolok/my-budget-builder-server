project          = "mybudgetpipauls"
credentials_file = "/Users/nicolasoudard/.gcp/mybudgetpipauls-3bbb38646a6c.json"

### Variables definition for VPC network
vpc_network_name = "private-csql-vpc-postgres"
routing_mode     = "GLOBAL"

### Variables definition for IP address allocation range
allocated_ip_address_range_name = "private-ip-allocation-postgres"
prefix_length                   = 16

### Variables definition for Cloud SQL
instance_name    = "pipaulsdb"
sql_region       = "europe-west1"
postgres_version = "POSTGRES_13"
sql_user_name    = "pipauls"
database_name    = "pipauls"

# Variables for SVPC connector
svpc_connector_name = "postgres-svpc-euw"
ip_cidr_range       = "10.0.8.0/28"
region              = "europe-west1"
min_throughput      = 200
max_throughput      = 300

# Variables for Standard Module
service_version = "v1"
service         = "server"
runtime         = "nodejs14"
threadsafe      = true
instance_class  = "F1"


# Google Cloud Platform

We use GCP stack
* App engine for the server
* Cloud SQl for the DB
* Private network to link DB with server ?
* App engine for the client : to check if we can simplify it to use a CDN like because it is only static files

## Server Application

### Build it

First, you need to build it (perhaps it is better to build it in the App engine environment ?)

### App engine

To test or deploy manually and use a public access to the DB
We created the app.yaml file with environment variable and a beta setting to access to Cloud SQL instance from app_engine

```
beta_settings:
  cloud_sql_instances: mybudgetpipauls:europe-west1:pipauls
```


# Terraform

To use GCP credentials.
I created a dedicated service account : `infrastructure-deployment@mybudgetpipauls.iam.gserviceaccount.com`

With the following Roles :
* Editor
* Compute Network Admin

and get its key locally in json (not saved in configuration for security reason)

## Tips

to use an already existing google bucket, you need to import it in your terraform state : 

```
terraform import google_storage_bucket.bucket appengine-sources
```

else, we would experience the following error :

```
│ Error: googleapi: Error 409: You already own this bucket. Please select another name., conflict
│
│   with google_storage_bucket.bucket,
│   on main.tf line 56, in resource "google_storage_bucket" "bucket":
│   56: resource "google_storage_bucket" "bucket" {
```

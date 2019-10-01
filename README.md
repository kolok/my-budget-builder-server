# Komber Server side

Komber is a SAAS product to manage Hiring planning and budget. It allows CEO, CFO and HR to plan, share and execute their Hiring plan.

This repository is the server side of the App and is linked to another repository :
https://gitlab.com/komber/komber-client

### technologies
##### Vue.js, Koa.js, Node.js, Postgresql

Main technologies used are the following
 * Postgresql as a high performance structured database
 * Node.js / Koa.js as a RESTFul API
 * Vue.js as a client side framework

Specific to the Server
   - [Koa](http://koajs.com/)
   - Koa Router, Koa Cors, Koa Bodyparser
   - Sequelize
   - Postgresql, Sequelize
   - Node

### Demo:
The Demo is not available yet.
TODO: Click [here](http://demo.komber.io) to see our demo website.

You can sign up or use the following access:
<pre>
  email: admin1@komber.io
  password: azerty
</pre>


### Architecture

    komber-server                  # server folder
     ├─src                  # server src
     │  ├─controllers
     │  │  └─_Controllers_  # by objects/routes
     │  ├─db
     │  │  ├─config         # connection and credentials config for db
     │  │  ├─migrations     # db migrations
     │  │  └─seeders        # seeds db
     │  ├─middleware
     │  │  └─jwt.js         # Manage authentication process with jsonwebtoken
     │  ├─models
     │  │  ├─_Models_       # Sequelize models
     │  │  └─index.js       # Sequelize builder (config and association management)
     │  ├─routes
     │  │  └─_routers_      # router by object type
     │  ├─app.js            # main js file which launch the server depending of the environment
     │  └─index.js          # server and router
     └─_config_files_

### Run through Docker

install docker and docker-compose

Launch the server:

```bash
    docker-compose up #(-d)# it will launch server and client side
```

And check the log:

```bash
    docker-compose logs # display the docker's logs
```

After adding a npm module (ex : npm i my_lib --save) you'll need to rebuild the docker image and restart it:

```bash
    docker-compose build --no-cache
    docker-compose restart
```

### Setup Locally:

To migrate and populate the database, you should follow the ./README.sequelize.md file


### ESLint

To manage the code quality, eslint is used.
It is possible to edit the eslint rule in the config files server/.eslintrc.json

Add to run it, use these commands
```bash
npm run eslint     # Check your coding style
npm run eslint-fix # Use auto ESLint fix
```

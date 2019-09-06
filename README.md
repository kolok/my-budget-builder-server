# Komber

Komber is a SAAS product to manage Hiring planning and budget. It allows CEO, CFO and HR to plan, share and execute their Hiring plan.

### technologies
##### Vue.js, Koa.js, Node.js, Postgresql

Main technologies used are the following
 * Postgresql as a high performance structured database
 * Node.js / Koa.js as a RESTFul API
 * Vue.js as a client side framework

### Environment:
- Server
   - [Koa](http://koajs.com/)
   - Koa Router, Koa Cors, Koa Bodyparser
   - Postgresql, Sequelize
   - Node ~~8.14.0~~
- Client
   - [Vue](https://vuejs.org/)
   - [ElementUI](https://element.eleme.io/#/en-US)
   - [Axios](https://github.com/axios/axios) (HTTP Client Library)
   - Webpack 4
   - WebpackDevServer (Development mode only)

### Demo:
The Demo is not available yet.
TODO: Click [here](http://demo.komber.io) to see our demo website.

You can sign up or use the following access:
<pre>
  email: admin1@komber.io
  password: azerty
</pre>


### Architecture

    ├─client                  # frontend folder
    │  ├─src                  # frontend src
    │  │  ├─api               # api services
    │  │  │  └─common         # api common components (used by services)
    │  │  ├─components        # Vue components
    │  │  │  ├─common         # Vue common component
    │  │  │  └─_packages_     # Vue component stored by package
    │  │  ├─store             # state management
    │  │  │  └─modules
    │  │  ├─styles
    │  │  ├─view              # app pages
    │  │  │  └─_packages_     # pages are stored by packages
    │  │  ├─router.js         # app router
    │  │  ├─main.js           # main js: start point of the app
    │  │  └─App.vue           # Main App page
    │  └─_config_files_
    |
    └─server                  # server folder
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

```bash
    docker-compose up #(-d)# it will launch server and client side
```

```bash
    docker-compose logs # display the docker's logs
```

### Setup Locally:

To migrate and populate the database, you should follow the ./README.sequelize.md file

### Production

To be continued...
```bash
npm run build      # Running production mode
```

### ESLint

To manage the code quality, eslint is used.
It is possible to edit the eslint rule in the config files client/.eslintrc.json and server/.eslintrc.json

Add to run it, use these commands inside client or server repository
```bash
npm run eslint     # Check your coding style
npm run eslint-fix # Use auto ESLint fix
```

# Node-RabbitMQ

## [Note]

### Description

```
1. If running in the localhost environment, the admin address is localhost:15673
  1-1. default id, password guest / guest
```

## Author

```
2022.06.13 -> 
Author: Hyunwoo Park
```

## Execute

```
1. yarn install
2. yarn start
3. If you run it with docker-compose Please check each container environment.
  3-1. docker-compose.app.yml = Create and run only nodejs(app) container.
  3-2. docker-compose.rabbitmq.yml = Create and run only rabbitmq container.
  3-3. docker-compose.full.system.yml = Create and run each container for rabbitmq, and nodejs(app)
  3-4. Docker environment variables are managed and used in src/config.
4. You can turn it on with a shell file in the scripts folder.
```
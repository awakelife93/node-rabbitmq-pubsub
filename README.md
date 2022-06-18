# NODE-RABBITMQ
#### 개발중
##### Author 박현우
##### Create Date 2022.06.13
#
### 개발 환경
* node 14+
* typescript
* dotenv
* nodemon
* amqplib
* docker-compose
#
### 내용
#
### 실행
1. rabbitmq + worker 같이 띄울 때
* docker-compose -f docker-compose-full.yml up 
2. rabbitmq만 띄우고, 따로 node 런타임 환경 만들 때
* docker-compose -f docker-compose-only-rabbitmq.yml up 
3. scripts안에 shell file로 켜도 됨.
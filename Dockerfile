FROM node:14
MAINTAINER 박우림 <woorimprog@gmil.com>

# 앱 디렉터리 생성
RUN mkdir /idu-market-server
WORKDIR /idu-market-server

# idu-market-server 폴더 안에 app 폴더 생성
RUN mkdir ./app

# 로컬에 있는 app폴더 안에 package*.json 파일들을 도커 컨테이너 안에 app 폴더 안으로 복사
COPY ./app/package*.json ./app/

# 의존성 설치
WORKDIR ./app
RUN npm install --unsafe-perm=true --allow-root

# 노드 서버 가동을 위해 필요한 파일들 복사
COPY ./app/bin ./bin/
COPY ./app/src ./src/
COPY ./app/app.js ./

# pm2 설치
RUN npm install -g pm2

# 노드 서버 가동
EXPOSE 9800
CMD ["pm2-runtime", "start", "./bin/www.js"]
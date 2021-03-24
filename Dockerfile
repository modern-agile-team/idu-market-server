FROM node:14
MAINTAINER 박우림 <woorimprog@gmil.com>

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 앱 의존성 설치
COPY ./app/package*.json ./

RUN npm install

# 앱 소스 추가
COPY ./app .

EXPOSE 8080
CMD [ "node", "bin/www.js" ]
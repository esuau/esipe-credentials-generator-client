FROM node:8.16.0-alpine as builder
ARG CODECOV_TOKEN
WORKDIR /app
COPY ./ /app/
RUN apk update && apk add chromium git
ENV CHROME_BIN=/usr/bin/chromium-browser
RUN npm install
RUN npm run test -- --code-coverage --browsers=ChromeHeadlessCI
RUN npm run codecov -- --token=$CODECOV_TOKEN
RUN npm run build -- --prod

FROM nginx:alpine
COPY --from=builder /app/dist/esipe-credentials-client/ /usr/share/nginx/html/

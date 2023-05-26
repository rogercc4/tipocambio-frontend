FROM node:12.10.0-alpine

WORKDIR /src/webapp

COPY . .
RUN npm install -g @angular/cli@10.0.0
RUN npm install
RUN ng build --prod --base-href=/

EXPOSE 4200

ENTRYPOINT ["ng", "serve", "--host" , "0.0.0.0"]
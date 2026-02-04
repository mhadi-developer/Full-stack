FROM node:22.21.0

WORKDIR /client

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build 

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host","0.0.0.0"]


# $ docker run -p 4000:5173 admin-panel
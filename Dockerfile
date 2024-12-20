# Use Node.js v14
FROM node:20

# Create app directory
WORKDIR /index.js

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 5000

CMD [ "node", "index.js" ]
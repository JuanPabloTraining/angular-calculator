FROM node:lts-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Make port 80 available to the world outside this container
EXPOSE 80

ENV NAME calculator-app

CMD ["npm", "start"]
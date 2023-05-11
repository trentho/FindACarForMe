FROM node:14.20.1-alpine

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH

# Get Dependencies
COPY package.json ./
COPY package-lock.json ./

# Install npm and react
RUN npm install --silent
RUN npm install react-scripts@3.4.1 -g --silent

COPY . ./

# Start
EXPOSE 3000
CMD ["npm", "start"]
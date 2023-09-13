# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json yarn.lock ./

# Install Yarn
# RUN npm install -g yarn

# Install app dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Build your Node.js app (replace 'yarn build' with your actual build command if different)
RUN yarn build

# Expose the port your app will run on (replace 3000 with your app's port if different)
EXPOSE 8080

# Run your Node.js app (replace 'yarn start' with your actual start command if different)
CMD ["yarn", "start"]
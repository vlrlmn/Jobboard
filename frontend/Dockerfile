# Use Node.js 22 as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to install dependencies
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy the entire project to the container
COPY . .

# Run the build script defined in package.json
RUN yarn build

# Install a lightweight static file server globally
RUN yarn global add serve

# Expose the port where the server will run (adjust as needed)
EXPOSE 3000

# Set the command to serve the built application
CMD ["serve", "-s", "dist", "-l", "3000"]

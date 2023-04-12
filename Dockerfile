# Base image
FROM node:latest as build

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the dependencies
#RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build the project
#RUN npm run build --prod

# Use the nginx image as the base image for the final image
FROM nginx:latest

# Copy the build files from the build container to the nginx container
COPY --from=build /app/dist/instapurrfect/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

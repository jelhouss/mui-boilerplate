# Development stage

# Install development deps
FROM node:lts-alpine as development-install
WORKDIR /usr/react-boilerplate
COPY package.json package-lock.json ./
RUN npm install --production=false --silent

# Run development build
FROM node:lts-alpine as development
EXPOSE 3000
WORKDIR /usr/react-boilerplate
COPY --from=development-install /usr/react-boilerplate/. .


# Production stage
# Install development deps... 
# Run production build... 
# Run the serving build process... 

# The default command (ignore)
CMD [""]
# Development stage

# Install development deps
FROM node:lts-alpine as development-install
WORKDIR /usr/mui-boilerplate
COPY .npmrc ./
COPY package.json ./
RUN npm install

# Run development build
FROM node:lts-alpine as development
EXPOSE 3000
WORKDIR /usr/mui-boilerplate
COPY --from=development-install /usr/mui-boilerplate/. .


# Production stage
# Install development deps... 
# Run production build... 
# Run the serving build process... 

# The default command (ignore)
CMD [""]
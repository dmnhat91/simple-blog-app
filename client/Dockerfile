# specify base image
FROM node:alpine

ENV CI=true

# set working directory to '/app' in the container. All following commands will be issued relative to this dir
WORKDIR /app

# copy over only the package.json file
COPY package.json ./
# install all dependencies
RUN npm install
# copy over all of our remaining source code
COPY ./ ./

#set the command to run when the container starts up
CMD ["npm", "start"]


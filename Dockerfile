# Use an official node runtime as a parent image
FROM node:8
# Set the working directory to /medium

# Copy the current directory contents into the container at /medium

COPY package*.json ./

# install node_modules
RUN npm install -g npm@5.5.1
RUN npm install -g sequelize-cli

RUN npm install

COPY . .

RUN git clone https://github.com/vishnubob/wait-for-it.git

# Make port 3000 available to the world outside this container
EXPOSE 3000

# RUN chmod 755 scripts/start_up.sh

CMD ["npm", "run", "dev"]
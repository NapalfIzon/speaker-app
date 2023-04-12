FROM node
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "run", "next:build"]
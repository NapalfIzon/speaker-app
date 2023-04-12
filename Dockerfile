FROM node
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8002
CMD ["npm", "run", "next:build"]
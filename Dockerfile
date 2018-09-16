FROM node:10
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# —------------------------------------
# Create final image
# —------------------------------------
FROM node:10
WORKDIR /app
COPY /app/dist .
ENTRYPOINT node ./index.js $ARGS
# Server
 ## Installation
On `./server` folder
 ```
 npm install
 ```
 ## Usage
Make sure you have `docker` and `docker-compose` in your system\
 On `./server` folder
 
 1. Start up database
 ```
 docker-compose up
 ```

2. Start api server
```
npm start
```

When want to clear all data use this command and restart server
```
npm run cleardb
```

Now api server is ready to use on http://localhost:8080\
Next step is run client TODO APP site

# Client
 ## Installation
On `./client` folder
 ```
 npm install
 ```
 ## Usage
On `./client` folder
Start api server
```
npm start
```
# Engine used in this project
node v14.15.4 \
npm v6.14.10
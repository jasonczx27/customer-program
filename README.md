# customer-program
SPA inReactjs with API in Node to utilize customer
developed on Windows 10, 
node -v@16.4.0
npm -v@7.19.1

## procedure
! Make sure you have node and npm installed, also with nodemon
clone this project https://github.com/jasonczx27/customer-program into your cloning environment
### api
0. Make sure port 8000 is not blocked by firewall or other security entities, in localhost.
1. navigate to api
2. run command npm install, if the installation wasn't successful, refer to {I see installation error while running npm install!} below
3. run 'nodemon app.js' or in Linux system, 'npx nodemon app.js' within the directory of api
4. as the databse is a free version, wait till you see the following ## database connected....database initiating successful
5. if it does not work, run rs at the same terminal you start the app, or kill process and rerun, as connection to database was slow

### web
0. make sure port 8001 is not blocked by firewall or other security entities, in localhost.
1. navigate to web
2. run command npm install, if the installation wasn't successful, refer to {I see installation error while running npm install!} below
3. run 'npm start'
4. once you get through api's step 4, you would be able to login using root account, userid:root  password: root
5. remember to disaable javascript disablers or ad-blocks, and allow cookies as the app uses minimal localstorage to store login session, 
you won't be able to login or proceed with the web operations otherwise.

## I see installation error while running npm install!
1. Check if package.json is present in first layer of the project module, 'api' and 'web', there should be 2 and in right place
2. You would like to remove the current node_modules, in shell script: 'rm -rf /node_modules' at the respective proejct module, run 'npm install'
3. Try to delete the package-lock.json as well if you're still stuck after steps 1-2, run 'npm install' after done so.

# Showcase
## login pages, light on and off
![image](https://user-images.githubusercontent.com/68674815/124383094-3f31d880-dcfd-11eb-9c36-d44accbbb04b.png)
![image](https://user-images.githubusercontent.com/68674815/124383106-4822aa00-dcfd-11eb-81b8-c62875964b1d.png)

## some validations
![image](https://user-images.githubusercontent.com/68674815/124383161-7902df00-dcfd-11eb-869e-51f478b6282a.png)
![image](https://user-images.githubusercontent.com/68674815/124383169-84560a80-dcfd-11eb-9101-9515ba7bbd9f.png)


## light off theme on main page, with tally data in database
![image](https://user-images.githubusercontent.com/68674815/124383035-009c1e00-dcfd-11eb-8225-569928a0a85a.png)
![image](https://user-images.githubusercontent.com/68674815/124383064-17427500-dcfd-11eb-9763-0f3512ad58ef.png)
## light on theme
![image](https://user-images.githubusercontent.com/68674815/124383083-2e816280-dcfd-11eb-93a4-09a92e7b276b.png)

## accessing on some 'customer details'
![image](https://user-images.githubusercontent.com/68674815/124383212-d1d27780-dcfd-11eb-917b-ab3f424dc866.png)

## smaller screen sizes
![image](https://user-images.githubusercontent.com/68674815/124383236-fc243500-dcfd-11eb-9ce1-7b856cd33b88.png)



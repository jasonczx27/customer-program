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




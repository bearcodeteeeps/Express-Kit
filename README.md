<img src="./cover.png">

# Express-Kit

This is a customize version of coding phase dev starter kit, which the goal is to save time of spending minutes, hours and more looking for ways to speed up your learning and workflow and just start to code.

Thanks to CodingPhase for create this again this is just a specification of this kit in Expres.js

## Steps


**Download or Pull This Repo**
	Top of this page you can see where it says clone or download


**Install Node**
 	https://nodejs.org/en/


**Install Mongo**
  https://brew.sh/


**Install Homebrew**
Brew install Mongo


**Install Yarn**
brew install yarn


**Install all the node packages**
  On the root of this project run on your terminal (if you want you can do this with yarn but thats optional)
  ```bash
      sudo npm install har-validator@latest --save-dev
      sudo npm install
      sudo npm install gulp-cli -g
      sudo npm install gulp@3.9.1 -g
      sudo npm install webpack@4.25.1 -g
      sudo npm install webpack-cli@3.1.2 -g
  ```


**Start the dev server**
  ```bash
    npm run watch

    or

    yarn watch
  ```


  **Start the dev server with proxy**
  ```bash
    npm run proxy

    or

    yarn watch
  ```


# EACCESS ERROR FIX
  ```diff
  - how to fix the EACCESS ERROR
  - lets say for example you trying to install webpack
  - sudo npm install webpack@4.25.1 -g
  - and get an error
  - Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/webpack/node_modules/fsevents/build'
  - then try again to install it but with this at the end "--unsafe-perm=true --allow-root"
  - for example
  - sudo npm install webpack@4.25.1 -g --unsafe-perm=true --allow-root
  ```

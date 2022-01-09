
## About Repo

Laravel Boiler Plate setup for the use on the go. This boiler plate is setup using Laravel sail to dockerize the application in it's containers. Vue.js is used a front end scaffolding. Databases ins place. To run the project on your local, clone this repository and run the following commands.
- Navigate to the cloned repo.
- Run: sail artisan key:generate
- Run: ./vendor/bin/sail up OR create a sail alias using "alias sail='[ -f sail ] && bash sail || bash vendor/bin/sail'" and then run sail up.
- You can also use "sail up -d" to run the container in detached mode.
- Run: cp .env.example .env. // might want to use sudo if requried.
- Run: ./vendor/bin/sail npm install OR if you have a sail alias setup from previous step: sail npm install.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains over 1500 video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.
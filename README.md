# Your Sport: The Social platform for Exercise
[![codecov](https://codecov.io/gh/ethancowey/SportApplicationBSFP/branch/master/graph/badge.svg?token=VG2BG5QU0B)](https://codecov.io/gh/ethancowey/SportApplicationBSFP)

MERN stack application which runs using docker as part of my assessment for CSC3131.

1. How to run the project.
2. Running tests.
3. Usage and 3 tier architecture.

## 1. How to run the project

To run this project you will need docker at version 3.9 or above.

In the root directory you can run the docker-compose.yml file by

`docker-compose build`

followed by

`docker-compose up`

The website will run at http://localhost:3000/ 

The server will run at http://localhost:8080/

The mongodb database will run at http://localhost:27017/

To stop these from running use this command

`docker-compose down`


## 2. Running tests

locally to run the tests you can run from the root directory both the server and client tests using these commands

`npm run build`

`npm run tests`

These tests also run externally using github actions when pushed to the repo, and their coverage are monitored
 by codecov.io.
 
 ## 3. Usage and 3 tier architecture
# Foobar-BIU-web

## Wiki
This readme file covers the technical aspects of the project. For extensive documentation of all features, including screenshots, refer to [the wiki](https://github.com/michaelts1/Foobar-BIU-mobile/wiki).

## Part 4
This is the branch for **part 4** of the project.
* The code for **part 3** can be found on the branch [part3](https://github.com/michaelts1/Foobar-BIU-web/tree/part3).
* The code for **part 2** can be found on the branch [part2](https://github.com/michaelts1/Foobar-BIU-web/tree/part2).

## Links to all repositories
* https://github.com/AsifMadar/Foobar-BIU - The repository for the bloom filter
* https://github.com/michaelts1/Foobar-BIU-backend - The repository for the Social App backend server
* https://github.com/michaelts1/Foobar-BIU-mobile - The repository for the Social App Android application
* https://github.com/michaelts1/Foobar-BIU-web - The repository for the Social App web application

## Running this project
This project is dependent on the backend server, so before running this project, you will need to set up and run [Foobar-BIU-backend](https://github.com/michaelts1/Foobar-BIU-backend).

To run the project, first install the dependencies using `npm install`, then execute the command `npm start`.

*Note: This code assumes the backend server is hosted at `localhost:8080`. If it is hosted on a different url, edit `BASE_URL` in `src/utils/axios.js` accordingly.*

## Workflow
At the start of the project, we sat down and planned the application structure, splitted the work between the three of us (Asif and Hodaya, and Michael) and created a sprint with the appropriate tasks on Jira. Afterwords we started working on the project, starting with the web application, and later moving on to the android application.

On the web application, we splitted the work between the three of us pretty evenly.

Our workflow was: selecting a task assigned to me on Jira, working on it in my own branch, and then selecting another related task and working on it as well. After completing the work on a part of the application (for example having both the sign-in and sign-up pages ready), opened a pull request for review by the 2 other members. After everyone approves the pull request, one of us merges it into main.

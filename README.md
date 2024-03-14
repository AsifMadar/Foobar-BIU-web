# Foobar-BIU-web

## Part 3
This is the branch for part 3 of the project. If you are looking for the branch of **part 2**, please go to the [part2](https://github.com/michaelts1/Foobar-BIU-web/tree/part2) or [main](https://github.com/michaelts1/Foobar-BIU-web/tree/main) branches (they are identical, really).

## Running the project

To run the project, first install the dependencies using `npm install`, then execute the command `npm start`

*Note: This code assumes your server is hosted at `localhost:8080`. If your server is hosted on a different url, edit `BASE_URL` in `src/utils/axios.js` accordingly.*

When the app first loads, you will be taken to the login page. If you don't have an account yet, click the "Sign Up Page" button to go to the sign up page. After filling the fields in the sign up page (the exact requirement for each field is listed next to the field), click the "Sign Up" button. You wil be taken to the feed screen, where you can scroll over the existing posts, create new posts and edit/delete your existing posts. Additionaly, each post has a comment section, which you can access either by clicking the "N comments" link bellow the post, or by clicking the "Reply" button (which will also open the comment creator).

In the top-right corner, there is a dark-mode toggle you can switch on or off. In the bottom of the left-side menu you can log out of your account, which will take you back to the login scree.

## Workflow
At the start of the project, we sat down and planned the application structure, splitted the work between the three of us (Asif and Hodaya, and Michael) and created a sprint with the appropriate tasks on Jira. Afterwords we started working on the project, starting with the web application, and later moving on to the android application.

On the web application, we splitted the work between the three of us pretty evenly.

Our workflow was: selecting a task assigned to me on Jira, working on it in my own branch, and then selecting another related task and working on it as well. After completing the work on a part of the application (for example having both the sign-in and sign-up pages ready), opened a pull request for review by the 2 other members. After everyone approves the pull request, one of us merges it into main.

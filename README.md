# Zion

#### Video Demo: <URL HERE>

## Install and Run

Global dependencies:

Node.js LTS v18 (or any higher version)<br>
Docker Engine v17.12.0 with Docker Compose v1.24.1 (or any higher version)

Run the command: npm install<br>
This will install the project's local dependencies.

Run the command: npm run dev<br>
This will expose the pages and APIs at http://localhost:3000/

In another terminal, run the command: npm run migration:up<br>
This will create the tables in the database.<br>
Make sure the Docker Engine is running.

## Description

### Fluxos da aplicação

#### Create new user

The page /cadastro has the SignUpForm component.<br>
When this form is submitted, a request is made to /api/v1/users with the POST method.<br>
The API checks if any field is blank and, if not, uses the create function of the user model.<br>
In the create function, validation (unique username, unique email, and a password length more than 6) functions are called.<br>
Afterward, the password is encrypted by the bcrypt hash function.<br>
Finally, an insert query will be executed with the validated data and encrypted password.<br>
If everything succeeds, the response will return a status code 201. Otherwise, the error handler will act and an error message will appear on the client's screen as an alert.

#### Login

The /login page has the LoginForm component.<br>
When this form is submitted, a request is made to /api/v1/auth with the POST method.<br>
The API checks that the email and password are not blank, then tries to find a user with the provided email.<br>
After finding the user, the provided password is compared with the stored password.<br>
If there is a match, the createJwt function of the authenticate model is triggered.<br>
This creates a JWT token with user data (email and role) and expiration time.<br>
The token is then returned to the client, who can use it in requests that require authorization.<br>
Also, a variable with username, email, and role is returned to the client.<br>
If authentication fails, the error handler will take action and an error message will appear on the client's screen as an alert.

#### Profile

The /perfil page has the UserProfile component.<br>
This component shows the data stored in the "user" variable in localStorage, and has a button to update and a button to delete the account.

The delete button triggers the /api/v1/users/self endpoint with the DELETE method.<br>
The API checks if the user can delete the account using the CanRequest function of the authorization module.<br>
If authorized, the deleteUserByUsername function of the user module is called.<br>
Finally, the response returns just the status code 204.

The update button redirects to the /perfil/atualizar page, which has the UpdateProfileForm component.<br>
When this form is submitted, a request is made to /api/v1/users/self with the PATCH method.<br>
The API checks if the user can update their data using the CanRequest function of the authorization module.<br>
If authorized, the updateEmail and updateUsername functions of the user module will be called.<br>
The new username and email will be validated (unique) and the changes will be executed.<br>
Finally, the response returns just the status code 204.

#### Accept new users

The /solicitacoes page has the SolicitationsList component.<br>
This component fetches the /api/v1/solicitations endpoint with the GET method.<br>
It then shows a list of users with the role equal to "waiting" and the buttons to accept as a member or guest or deny.

Accepting a user as a member or guest triggers the /api/v1/solicitations endpoint with the PATCH method.<br>
The API checks if the user can update the user role using the CanRequest function of the authorization module.<br>
The API checks that the username of the user to update and the role are not blank.<br>
Then the updateRole function of the user module is called.<br>
Finally, the response returns just the status code 204.

Denying the user triggers the /api/v1/solicitations endpoint with the DELETE method.<br>
The API checks if the user can delete a user using the CanRequest function of the authorization module.<br>
Then the deleteUserByUsername function of the user module is called.<br>
Finally, the response returns just the status code 204.

#### List users

The /membros page has the UsersList component.<br>
This component fetches the /api/v1/users endpoint with the GET method.<br>
The API checks if the user can list users using the CanRequest function of the authorization module.<br>
If authorized, the findAll function of the user module will be called.<br>
The user list data will be cleaned up to avoid sending sensitive data using the filterOutput function of the authorization module.<br>
Finally, the response returns the status code 200 and the secure user list.

#### Create meeting

The /publicar page has the PostForm component.<br>
When this form is submitted, a request is made to /api/v1/meetings with the POST method.<br>
The API checks if the fields date, time, and location are blank and, if not, uses the create function of the meeting model.<br>
Then an insert query will be executed.<br>
If everything succeeds, the response will return a status code 201. Otherwise, the error handler will act and an error message will appear on the client's screen as an alert.

#### List meetings

The /encontros page has the MeetingsList component.<br>
This component fetches the /api/v1/meetings endpoint with the GET method.<br>
The API checks if the user can list meetings using the CanRequest function of the authorization module.<br>
If authorized, the listMeetings function of the meeting module will be called.<br>
The listMeetings function sends the meetings in order by date in descending order and in pages of 6. The user can see older meetings by going through the pages.<br>
Finally, the response returns the status code 200 and the meetings list.

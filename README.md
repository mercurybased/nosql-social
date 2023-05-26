# NoSql Social Media
  ![github license](https://img.shields.io/badge/license-MIT-black.svg)

## Description
This project includes CRUD functionality for a user, their thoughts, their friend list and reactions to thoughts. It utilizes the Mongoose object modeling, and creates an entire back end where all you need to do is add the front-end to have your own social media website
      
      
## Table of Contents 

* [Installation](#installation)

* [Usage](#usage)
 
* [License](#license)

* [Contributing](#credits)



## Installation
 simply clone this repository, open your integrated terminal and use the command `npm i` to install all necessary packages, and run the command `node index` to get it running on your localhost:3001


## Usage
go to `localhost:3001/api/users` in insomnia and use a `GET` request to view all your users, create a `POST` request to create a new user using the JSON body to enter the username and email for the user. Then go to `localhost:3001/api/users/:userId` and make a `PUT` request to edit your user info and the `DELETE` request to delete the given user. Follow suit for the same requests but on the `localhost:3001/api/thoughts` for your `GET` and `POST`, and `localhost:3001/api/thoughts/:thoughtsId` for the `PUT` and `DELETE` routes.

To add a friend to a User, create a `POST` request for `http://localhost:3001/api/users/:userId/friends/:friendId` to associate two users as "friends", use the same url for a `DELETE` request.

To add a reaction to a Thought, go to `http://localhost:3001/api/thoughts/:thoughtId/reactions` with a `POST` request, and include a JSON body like the following example:
`{
	"reactionBody":"wow can't wait to enjoy the sunlight again!",
	"username":"peelsRus"
}`
to delete, simply add the `/:reactionId` to the end fo that url and make a `DELETE` request


## Credits
- Veronica Griggs https://github.com/DevManCryBB

## License
MIT

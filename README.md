# Music Library API  

A music library REST API capable of performing CRUD (create, read, update, delete) operations on a database. 

Created using Express, Node.js, and MySQL. 

For the Manchester Codes bootcamp Backend module. 

## About Music Library 

This project uses an Express server to connect to a MySQL relational database. 

## Tech 
<ul>
<li>NPM</li>
<li>Node.js</li>
<li>Express</li>
<li>MySQL and MySQL Workbench</li>
<li>Docker container used to run the MySQL database locally</li>
<li>Dotenv used to load the environment variables</li>
<li>Postman used for testing endpoints during development</li>
<li>Nodemon to refresh the app after making changes during development</li>
<li>Test-driven development using Mocha, Chai & Supertest</li>
</ul>

## Concepts
As part of the Manchester Codes Software Engineering course, the music library project covers:

<ul>
<li>Database design</li>
<li>Data schema</li>
<li>SQL and MySQL</li>
<li>Database queries using CRUD operations</li>
<li>API development</li>
</ul>


## Get started with Music Library 

Clone this repo and install NPM

```sh
  $ git clone https://github.com/adacameron/music-library-api.git
  $ cd music-library
  $ npm install
  ```

Create `.env` and `.env.test` files in the project root folder and add these environment variables:

  ```sh
  DB_PASSWORD=password
  DB_NAME=music_library 
  DB_USER=root
  DB_HOST=localhost
  DB_PORT=3307
  PORT=3000
  ```

### Run the app 

 ```sh
  npm start
  ```

## CRUD operations

Using `GET` `POST` `PATCH` and `DELETE` HTTP requests, the API can be used to:
<ul>
    <li>Create new artists, albums, and songs.</li>
    <li>Generate a list of all artists or albums in the database.</li>
    <li>Retrieve a specific artist, album or song.</li>
    <li>Update artist, album, and song database records.</li>
    <li>Delete artist, album, or song database records.</li>
</ul>

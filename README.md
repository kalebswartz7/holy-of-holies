# About HolyOfHolies

This project is a result of two of my passions, **development** and learning about the **word of God**. 

The general idea behind this project is to replicate something like bible.com, with new features being added over time. 

I used [Bible API](scripture.api.bible) to get the actual bible data, stored the data I needed in MongoDB, and use the Angular frontend to query Mongo and get the data necerssary. Express and NodeJS are used for the backend calls, primarily to query API data and send it to
Mongo. 

Currently this project is only available **locally**, but I am working to make it public soon. 

## How to Use 
* Command `ng serve` to spin up the angular frontend
* Command `nodemon server.js` to spin up the backend 
Select a specific translation, then book, then chapter. Books available are based 
on the translation selected and chapters are based on the book selected. The actual 
content will then be displayed. 

## Upcoming features 
* Frontend design optimizations 
* Buttons for going to the next / previous chapter 
* Hosting the express routes on something like AWS Lambda and the frontend on Heroku 

![HolyOfHolies](/readme_src/HolyOfHolies.gif)
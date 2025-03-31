# G2FLIX: Are you not Entertained?

## Table of Contents
* [Overview](#overview)
* [Features](#features)
* [Installation / Usage](#installation--usage)
* [Technologies Used](#technologies-used)
* [Summary](#summary)
* [Links](#links)
* [Screenshots](#screenshots)
* [Credits](#credits)

## Overview
You have been looking for a series you watched long time ago don't want to forget what it was? Or planning to buy it later?
This application will let the user search for the books, movies, tv shows, and snacks from the search engine.
Create an account and save the entertainment titles you like and accompany them with a recommended snack of choice.
As time goes by and you started to change the titles you enjoy, simply remove them from the saved list.

## Features
* Sign Up / Log In
* Search for what is of interest
* Get snack recommendations
* Save your favorite books, movies, tv shows, or snacks
* Remove saved items from the list

## Installation / Usage
If you want to have it in local:
1. Clone repository:
    ```bash
    git clone git@github.com:san1718/P3G2-G2FLIX.git
    ```
2. Install dependencies:
* Server
    ```bash
        cd server
        npm install
    ```
* Client
    ```bash
        cd ../client
        npm install
    ```
3. Set up .env file:
    ```plaintext
        OMDb=your_apiKey
    ```
4. Run application:
    ```bash
        npm run develop
    ```
5. Navigate to:
    ```plaintext
        localhost:3000
    ```

## Technologies Used
1. Front-end: React, HTML/CSS
2. Back-end: Node.js, Express, MongoDB
3. Authentication: JWT

## Summary
This search engine will let the user to save their favorite titles and recommend snacks to go with it, if wanted.
The user will be able to delete the titles later on if desired the list if not needed anymore.

## Links
* [Home](https://github.com/san1718/P3G2-G2FLIX)
* [Try it! (Demo)](https://p3g2-g2flix.onrender.com/)
* [Template](https://docs.google.com/presentation/d/1fBD6A1IVVCHKd_RoRnY85M1LM0RRXkNRnW4dkwoTE48/edit?usp=sharing)

## Screenshots
<img width="1000" alt="Homepage" src="https://github.com/san1718/P3G2-G2FLIX/blob/main/images/Homepage.png">
<img width="1000" alt="LogInSignUp" src="https://github.com/san1718/P3G2-G2FLIX/blob/main/images/LoginSignUp.png">
<img width="1000" alt="SaveList" src="https://github.com/san1718/P3G2-G2FLIX/blob/main/images/SavedBooks.png">
<img width="1000" alt="RemoveList" src="https://github.com/san1718/P3G2-G2FLIX/blob/main/images/Delete.png">

## Credits
* [Sung Min An](https://github.com/san1718)
* [Art Camacho](https://github.com/ArtCamacho)
* [Maritza Diaz](https://github.com/maritzadiaz77)
* [Crispin Duarte](https://github.com/CrispinDD1)

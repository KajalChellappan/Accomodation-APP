@Author Kajal Chellappan

Accomodation App

# Project Description

The project is an Application facilitating the Accomodation search for Students.
The Application includes search, posting and chat functionalities, where a user can search for an accomodation based on provided search filters and also can post a vacancy.

# Installation

IDE : Microsoft VS code

## Frontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli)

To install angular/cli run :

> `npm install -g @angular/cli`

Install Dependencies :

> `npm install`

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

To Run client server.

> `ng serve`

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

Local installation with `ng`

> `ng add @compodoc/compodoc`

The package @compodoc/compodoc@1.1.19 will be installed and executed.

Run `ng test` to execute the unit tests via Karma.

## Backend

Database : Postgres

Spring Boot

Note : Cors installation is neccessary using the command

> `npm install --save cors`

# Basic usage

The application is basically focussed on Accomodation search.
A user can search the accomodation from the dashboard as guest.The search is statically loaded currently.
An admin user can add an accomodation post.
A logged in user can chat with customer support with queries.

User can do the following operations :

- First the Search dashboard is loaded with the accomodations cards and user can search in the dashboard screen without login
- User can Login and chat with customer support regarding any queries
- Admin can login with admin credentials and post an ad to be displayed in the accomodation grid by clicking "Post adv" button
  > `Note : admin credentials`
  >
  > > email : "admin@gmail.com" , passsword : admin123
- User can register using the register screen and then login
- User can update the password in case they forget the password using a valid email address

# Implementation of the Requests

API Requests implemented :

- Login Request
- Register Request
- Forgot Password Request(verify email and update password)
- Post advertisement Request
- Chat Request

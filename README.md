# QuickCredit

### Travis CI
[![Build Status](https://travis-ci.com/Morsetim/QuickCredit.svg?branch=develop)](https://travis-ci.com/Morsetim/QuickCredit)

[![Maintainability](https://api.codeclimate.com/v1/badges/ecf7634786c036bb3d9f/maintainability)](https://codeclimate.com/github/Morsetim/QuickCredit/maintainability)

[![Coverage Status](https://coveralls.io/repos/github/Morsetim/QuickCredit/badge.svg)](https://coveralls.io/github/Morsetim/QuickCredit)
## Description
Quick Credit is a non line lending platform that provides short term soft loans to individuals. This helps solve problems of financial inclusion as a way to alleviate poverty and empower low income earners.

# Table of Contents

 * [Technologies](#technologies)
 * [Features](#features)
 * [Installation](#installation)

## Technologies
* HyperText Mark-up Language (HTML)
* Cascade Style Sheet (CSS)
* Vanilla Javascript
* PostgreSQL Database(raw SQl)
* Nodejs (Express framework)

### Pivotal Tracker
QuickCredit app project is broken down into small task with pivotal tracker board. The link to the relevant Pivoltal tracker board is https://www.pivotaltracker.com/n/projects/2326625


### API Enpoint
API Endpoints is hosted at https://quickcr.herokuapp.com/

### UI Templates
The application is hosted online on gh-pages with https://morsetim.github.io/QuickCredit/TEMPLATE/html/client/index,
https://morsetim.github.io/QuickCredit/TEMPLATE/html/admin/admin-dashboard.html
 [QuickCredit] 

### API Documentation
API documentation 


## Features
- User (client) can sign up and sign in.
- User can Apply for a Loan
- User (client) can request for only one loan at a time.
- User (client) can view loan repayment history, to keep track of his/her liability or
responsibilities.
- Admin can mark a client as verified, after confirming his/her home and work address.
- Admin can view a specific loan application.
- Admin can approve or reject a client’s loan application.
- Admin can post loan repayment transaction in favour of a client.
- Admin can view all loan applications.
- Admin can view all current loans (not fully repaid).
- Admin can view all repaid loans

## Getting Started
### Installation
- install POSTMAN app
- run `npm run start:dev` then navigate to `localhost:4000` on POSTMAN


### API Endpoint Route 
<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>TASK</th></tr>

<tr><td>POST</td> <td>api/v1/auth/signup</td> <td> SignUp </td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td> <td> Sign-In </td></tr>

<tr><td>POST</td> <td>/api/v1/loans</td> <td> Apply </td></tr>

<tr><td>GET</td> <td>/api/v1/loans/loanId</td> <td> GetoneLoan </td></tr>

<tr><td>GET</td> <td>/api/v1/loans/repaid</td> <td> repaid </td></tr>

<tr><td>GET</td> <td>/api/v1/loans/unrepaid</td> <td> Unrepaid </td></tr>

<tr><td>GET</td> <td>/api/v1/loans/1/repayment</td> <td> Loan repayment ID</td></tr>

<tr><td>GET</td> <td>/api/v1/loans</td> <td> GetAllLoans</td></tr>

<tr><td>PATCH</td> <td>/api/v1/loans/loanId</td> <td> Update Approve/Reject Loan</td></tr>

<tr><td>PATCH</td> <td>/api/v1/users/email/verify</td> <td>Verified</td></tr>






</table>

## Author
**Maurice Etim**  
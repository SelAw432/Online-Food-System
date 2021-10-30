# Online Food Ordering & Delivery System

## Project Overview

This Website is a food delivery website where you can order a variety of dishes.

**Contents**

- Features:
    1. Allows users to order food from a variety of restaurants.
    2. Enables users to create an account or login as a guest
    3. JSON Database 
    4. User Authentication 
    5. Stores logged in users previous orders and displays on website
    6. Comment section to give feedback on project
    7. Responsive Webpage

The main home page is 'index.html'.  There are 5 futher subfolders
+ API - which is named app.js.
+ client - which contains all the client side pages. 
+ JSON file- which serves as the database for the User Authentication and for Storing Customer Comments. 
+ Video  - Explains the full functionality of the website.
+ Documentation - contains the read me file. 
+ JS files - such package.json and the test file

## How To use:

##### 1. Clone the repository to your local machine
    gh repo clone SelAw432/Online-Food-System
    
##### 2. Cd into Project directory
    cd Online-Food-System

##### 3. Install all project dependencies
    npm install

##### 4. Start Server 
    npm start
    
##### 5. You should see server listening at specific port on localhost
    Listening at http://127.0.0.1:8090

##### 6. Go to webpage and navigate towards homepage
    http://127.0.0.1:8090

##### 1. Start Server

    Please always remember to start the server, to avoid any errors. If Server crashes please restart it.
        +    

+ LOGIN

    When you start the Server, you will be directed to the login page. You have onr of 3 options. 
    • LOGIN
    • REGISTER
    • LOGIN AS A GUEST

    If you skip all three and redirect the page to the home page, you will automatically sign in as a GUEST.

    When you REGISTER you are redirected to the login page where you can login with your newly created account.
    Please tryout different usernames as a username already used would not be accepted into the database hence you may 
    not be able to login, without the valid password
    
+ HOME PAGE 

    Once you are directed to the home page you can place your orders.

    The home page comprises of 5 main section with a 6th one (Order History) added for only registered users.

    You can click on the sections in the navigation bar to move to that section of the page.

    To order food click on the menu section.
    You will be taken to a section of the page with buttons named after some food
    Click on any of them of your choice to be presented with another menu of dishes based on the category 
    you clicked.

    They will appear in the form of cards, click the "+" to add one of this dishes to the cart and "-" to 
    remove one of this dishes from the cart.

    When done selecting click on Update basket to add all the items to the cart. They will appear in the orders section.

+ CHECKOUT

    Once done ordering you would have to checkout. Fill in all the required details to checkout your order. Your orders will not 
    go through if all input boxes arent filled. All are mandatory. 

    Once filled click on "Continue to checkout" to process payment

+ COMMENTS

    While you wait for your order you can add a comment to help improve the website. We value your comments.


+ EXTRA FUNCTIONALITY

    When you create an account and order food. Anytime you return, your order History is updated.

    The page is also responsive.

    The page handles server crashes as well.





    






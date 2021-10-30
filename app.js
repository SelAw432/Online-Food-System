const express = require('express');
const app = express();
const router = express.Router();
const path = require('path');
var fs = require('fs');


app.use(express.static(path.join(__dirname, 'client')));

var publicPath = path.join(__dirname, 'client');

app.use(express.json()); //Parse JSON-encoded variables

// Router that sends user to index.html webpage on this request
router.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/"));
    
});

// Router that sends user to home.html webpage on this request
app.get('/home', function (req, res) {
    res.sendfile(publicPath + '/home.html');
    
});

// MENU LIST- Contains all food available on Website

 var food = {
    
    "country": [
        { "optionId": 1, "country": "Ghana", "name": "Spicy Jollof rice", "restaurant":"Mama Jays", "price":"20", "image":"images/food/jollof.jpeg"},
        { "optionId": 2, "country": "Chinese", "name":"Rice and Sweet Chicken Sauce", "restaurant":"Tuktuk", "price":"27", "image":"images/food/chinese.jpg"},
        { "optionId": 3, "country": "Thai", "name":"Pad thai", "restaurant":"Tuktuk", "price":"27", "image":"images/food/pad_thai.jpg"},
        { "optionId": 4, "country": "Italian", "name":"Gennaro Contaldo's Authentic Italian Spaghetti", "restaurant":"Zizzi", "price":"27", "image":"images/food/italian_cabonara.jpg"},
    ],

    "burgers": [
        { "optionId": 5,  "name": "Ham burger with Cheese and Patties", "restaurant":"Tango", "price":"20", "image":"images/food/ham_burger.jpg"},
        { "optionId": 6,  "name":"Chicken burger", "restaurant":"Fat Hippo", "price":"27", "image":"images/food/chicken_burger.jpg"},
        { "optionId": 7,  "name":"Ultimate triple spicy jerk chicken burger", "restaurant":"Broom House", "price":"27", "image":"images/food/ult_burger.jpg"},
        { "optionId": 8,  "name":"Extra Cheesy Classic", "restaurant":"Revolution", "price":"27", "image":"images/food/extra_cheesy_burger.jpg"},
   
    ],

    "dessert": [
        { "optionId": 9,  "name": "Ice cream on brown cookies", "restaurant":"Tango", "price":"20", "image":"images/food/ice_cream_on_cookies.jpeg"},
        { "optionId": 10,  "name":"Oreo cookies sanwich dessert in short stem glass", "restaurant":"Fat Hippo", "price":"27", "image":"images/food/oreo_sandwich.jpg"},
        { "optionId": 11,  "name":"Doughnut", "restaurant":"Broom House", "price":"27", "image":"images/food/doughnut.jpg"},
        { "optionId": 12,  "name":"Strawberry with banana pancakes", "restaurant":"Revolution", "price":"27", "image":"images/food/strawberry_pancakes.jpg"},
    ],

    "chicken": [
        { "optionId": 13,  "name": "Fried chicken nuggets with sirachi sauce", "restaurant":"Fifty Six", "price":"20", "image":"images/food/fried_chicken.jpg"},
        { "optionId": 14,  "name":"Grilled chicken skewers with fries", "restaurant":"Zaps", "price":"27", "image":"images/food/chicken_skewers.jpg"},
        { "optionId": 15,  "name":"Spicy Jerk chicken wings with white sauce", "restaurant":"Mac and Wings", "price":"27", "image":"images/food/wings.jpg"},
        { "optionId": 16,  "name":"Full Roast Chicken", "restaurant":"Fowl play", "price":"27", "image":"images/food/roast_chicken.jpg"},
    
    ],

    "wine": [
        { "optionId": 17,  "name": "Paternina Gran Reserva 1964 Red wine", "restaurant":"DuneIm Food Stores", "price":"20", "image":"images/food/red.jpg"},
        { "optionId": 18,  "name":"Canaletto Pinot Grigio IGT 2019/2020 75cl White wine", "restaurant":"DuneIm Food Stores", "price":"27", "image":"images/food/white.jpg"},
        { "optionId": 19,  "name":"Tesco Finest Pinot Grigio White wine", "restaurant":"DuneIm Food Stores", "price":"27", "image":"images/food/white2.jpg"},
        { "optionId": 20,  "name":"Don Cayetano Chardonnay 2020", "restaurant":"DuneIm Food Stores", "price":"27", "image":"images/food/white3.jpg"},
    ],

    "pizza": [
        { "optionId": 21,  "name": "Zizzi Special Pepperoni Pizza", "restaurant":"Zizzi", "price":"20", "image":"images/food/pepperoni.jpg"},
        { "optionId": 22,  "name":"Hawaiian Classic Tuna Pizza", "restaurant":"Zaps", "price":"27", "image":"images/food/hawaiian.jpg"},
        { "optionId": 23,  "name":"Meat Feast", "restaurant":"Mac and Wings", "price":"27", "image":"images/food/meat_feast.jpg"},
        { "optionId": 24,  "name":"Garden Party Classic Vegetarian Pizza", "restaurant":"Fowl play", "price":"27", "image":"images/food/garden_party.jpg"},
    ],

    "sandwiches": [
        { "optionId": 25,  "name": "Zaps Classic Tacos", "restaurant":"Zaps Burrito Bar", "price":"20", "image":"images/food/taco.jpg"},
        { "optionId": 26,  "name":"Beef and mozarrela Sandwich", "restaurant":"Co-op", "price":"27", "image":"images/food/beef_sandwich.jpg"},
        { "optionId": 27,  "name":"Co-ops classic club sandwich", "restaurant":"Co-op", "price":"27", "image":"images/food/club_sandwich.jpg"},
        { "optionId": 28,  "name":"BLT sandwich", "restaurant":"The Queens Head", "price":"27", "image":"images/food/blt.jpg"},
   
    ],
    
    "lunch": [
        { "optionId": 29,  "name": "Nandos Grilled chicken and fries", "restaurant":"Nandos", "price":"20", "image":"images/food/grilled_chicken_chips.jpg"},
        { "optionId": 30,  "name":"Spicy Stir Fry Noodles", "restaurant":"Tuktuk", "price":"27", "image":"images/food/stir_fry.jpg"},
        { "optionId": 31,  "name":"Ultimate garden feast", "restaurant":"Co-op", "price":"27", "image":"images/food/garden_feast.jpg"},
        { "optionId": 32,  "name":"Chicken Katsu Curry", "restaurant":"Tuktuk", "price":"27", "image":"images/food/katsu_curry.jpg"},
    ],

    "breakfast": [
        { "optionId": 33,  "name": "Full English Breakfast", "restaurant":"Treats Tea Room", "price":"20", "image":"images/food/full_english_breakfast.jpg"},
        { "optionId": 34,  "name":"Oat Porridge with fruits", "restaurant":"Treats Tea Room", "price":"27", "image":"images/food/oat_porridge.jpg"},
        { "optionId": 35,  "name":"Fruit waffles with porridge", "restaurant":"Treats Tea Room", "price":"27", "image":"images/food/waffles.jpg"},
        { "optionId": 36,  "name":"Strawberry Pancakes with Yogurt Cream & Berry Jam", "restaurant":"Treats Tea Room", "price":"27", "image":"images/food/breakfast_pancakes.jpg"},
    ]
};



var cart = [];

var comments = [];

var currentUser;
// LOGIN AND REGISTERATION FUNCTIONALITY

app.post('/register', function(req,resp){
    // Store user details in variables
    const username = req.body.regUsername;
    const email = req.body.regEmail;
    const password = req.body.regPassword;
    
    
    // Read JSON file containing all Registered users
    fs.readFile('authenticator.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        
        let users = JSON.parse(data); //now it an object
        
        users.push({'user':username,'userEmail':email, 'password':password, 'prevOrders':[]}); //add some data
            
            let json = JSON.stringify(users,null,2); //convert it back to json
            // Write variables containng new user details into JSON file containing all Registered users
            fs.writeFile('authenticator.json', json, 'utf8', function callback(err,data){
                if (err){
                    console.log(err);
                } else{ 
                    // Return the updated JSON file
                    fs.readFile('authenticator.json', 'utf8', function readFileCallback(err, data){
                        if (err){
                            console.log(err);
                        } else {
                        
                        resp.json(data);
                        }});
                }    
            });
    }});    
});

// Return JSON file containing all registered Users
app.get('/userDatabase', function(req,resp){
    fs.readFile('authenticator.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {    
            
            var Data = JSON.parse(data);
            resp.json(Data);
    }});
});


// Stores Username of current user temporarily to be displayed on webpage
app.post('/User', function(req,resp){
    currentUser = req.body.User;
    resp.json(currentUser);  
});

// Updates the Order History of the "REGISTERED USER"
app.post('/updateOrderHistory', function(req,resp){
    const newOrders = req.body.newOrders;
    
    // Read the JSON Database
    fs.readFile('authenticator.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        
        let users = JSON.parse(data); //now its an object
        
        // Loop through JSON database
        for (var i = 0; i < users.length; i++){

            // Look for User in database based on Username match
            if(users[i].user === currentUser){

                // Add new order to Order History List
                users[i]["prevOrders"].push(newOrders);
                let json = JSON.stringify(users,null,2); //convert it back to json


                fs.writeFile('authenticator.json', json, 'utf8', function callback(err,data){
                    if (err){
                        console.log(err);
                    } else{ 

                        // Return Update User Details
                        fs.readFile('authenticator.json', 'utf8', function readFileCallback(err, data){
                            if (err){
                                console.log(err);
                            } else {
                            
                            let users = JSON.parse(data); //now it an object
                            for (var i = 0; i < users.length; i++){

                                if(users[i].user === currentUser){
                                    resp.json(users[i]);
                                    }
                                }
                            }});
                        }    
                    });
                }
            }    
            
        }
    });    
});

// Store the username of the customer or store as gueat
app.get('/CurrentUserInfo', function(req,resp){
    
    if (currentUser === undefined || currentUser === 'guest'){
        resp.json('guest');
    }
    else{
        resp.json(currentUser);
    }
   
});

// HOME PAGE FUNCTIONALITY

// Returns the entire Food Menu Database
app.get('/list', function(req,resp){
    resp.json(food);

});


// Add Comments to the Comment Database
app.post('/comment/add', function(req,resp){
    const comment = req.body.newComment;
    const customer = req.body.customerName;
    const email = req.body.customerEmail;

    
    // Read database comments
    fs.readFile('comments.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        comments = JSON.parse(data); //now it an object
        comments.push({'comment':comment,'customer':customer, 'email':email}); //add some data
        let json = JSON.stringify(comments,null,2); //convert it back to json

        // Write to the database
        fs.writeFile('comments.json', json, 'utf8', function callback(err,data){
            if (err){
                console.log(err);
            } else{ 

                // Read and return updated comment database
                fs.readFile('comments.json', 'utf8', function readFileCallback(err, data){
                    if (err){
                        console.log(err);
                    } else {
                    comments = JSON.parse(data);
                    resp.json(data);
                    }
                });
            }    
        });
    }});    
});


// Return comment database
app.get('/comment', function(req,resp){

    fs.readFile('comments.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {    
            
            let newData = JSON.parse(data);
            resp.json(newData);
    }});
});


// Return List of Items in Cart
app.get('/addToCart', function(req,resp){
    resp.json(cart);
});


// Update items already present in Cart
app.post('/addToCart/changeJSON', function(req,resp){
    const foodId = req.body.food;
    const quantity= req.body.quantity;
    
    // Search through cart list and update quantity
    for (var i = 0; i < cart.length; i++){
        if (foodId == cart[i].food){
            if (quantity === 0){
                cart.splice(i,1);
            }
            else {
                cart[i].quantity = quantity;
            }
            
        }
    }
    resp.json(cart);
    
});

// Add new entries into Cart
app.post('/addToCart/newEntry', function(req,resp){
    const foodId = req.body.food;
    const quantity= req.body.quantity;
    cart.push({'food':foodId, 'quantity':quantity});
    resp.json(cart);
});


// Compare ID's of items in cart with food menu items and return the details of matching ID's
app.get('/checkout/order',function(req,resp){

    // Store details of Items with matching ID's
    var checkout = [];

    // Search for Items with matching ID and append to list
    for(var i = 0; i < cart.length; i++){
        
        var cartId = cart[i].food;
        
       
        for(var key of Object.keys(food)){
    
            for( var j = 0; j < food[key].length; j++){
                var menuId = food[key][j].optionId;
                
    
                if (cartId === menuId) {
                    
                    checkout.push(food[key][j]);
                    }
            }
        }
    }
    resp.json(checkout);
});



module.exports = app;
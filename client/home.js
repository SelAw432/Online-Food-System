// Navigation bar Styling & Animaions
let LogHistory = [];


$(document).ready(function(){
    $('#menu-bar').click(function(){
        $(this).toggleClass('fa fa-bars');
        $('.nar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function (){
        $('#menu-bar').removeClass('fa fa-bars');
        $('.nar').removeClass('nav-toggle');

        
    });

    $('.food .menu .btn').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    $(window).scroll(function(){
        var scrollTop = $(window).scrollTop();
        if ( scrollTop > $('.header').height()) { 
            $('.Navbar').addClass('custom');
          }
        else {
            $('.Navbar').removeClass('custom');
        }
    });

});

//  renderThings functionality- Renders html into content Id


function renderThings(things){
    let container = document.getElementById('content');
    container.innerHTML = things;
}

// Food Number Update Functionality
// FoodId- Contains the Id needed to identify the food ordered
async function addFood(foodId){

    try {
        // Retrieve No of Items in cart
        let getResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let body = await getResponse.json();
        let food = foodId; 
        // bool - (True- If items is already in cart)/ (False-If item is not in cart)
        let bool = false; 
        
        // Loop through content of cart
        for (var i = 0; i < body.length; i++){

            // Check if current item being added to cart is in the cart. Compares Ids
            if (food == body[i].food){
                
                // If item is present boolean is True
                bool = true;
                // Quantity of item in cart
                let quantity = body[i].quantity;
                // Increment quantity of cart
                quantity = parseInt(quantity) + 1;
                // Render quantity into html
                document.getElementById('q'+food).innerHTML = quantity;
                
                // Change the quantity stored in the API
                let parameters = {'food':foodId, 'quantity':quantity};
                let postResponse = await fetch('http://127.0.0.1:8090/addToCart/changeJSON',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(parameters)
                });
    
            }      
        }
        // Item was not detected in cart
        if (bool === false){
            let quantity = 1;
            document.getElementById('q'+food).innerHTML = quantity;
            // Change the quantity stored in the API
            let parameters = {'food':foodId, 'quantity':quantity};
                let postResponse = await fetch('http://127.0.0.1:8090/addToCart/newEntry',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(parameters)
                });
            }
        }

        // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

// FoodId- Contains the Id needed to identify the food removing from Cart
async function removeFood(foodId){
    try {
        
        // Retrieve No of Items in cart
        let getResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let body = await getResponse.json();
        let food = foodId;
        // bool - (True- If items is already in cart)/ (False-If item is not in cart)
        let bool = false;
        

         // Loop through content of cart
        for (var i = 0; i < body.length; i++){

            // Check if current item being removed to cart is in the cart. Compares Ids
            if (food == body[i].food){
                
                // If item is present boolean is True
                bool = true;
                // Quantity of item in cart
                let quantity = body[i].quantity;
                // Decrease quantity of cart
                quantity = parseInt(quantity) - 1;
                // Render quantity into html
                document.getElementById('q'+food).innerHTML = quantity;
                
                // Change the quantity stored in the API
                let parameters = {'food':foodId, 'quantity':quantity};
                let postResponse = await fetch('http://127.0.0.1:8090/addToCart/changeJSON',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(parameters)
                });
    
            }      
        }

        // Item was not detected in cart
        if (bool === false){
            //pass
            }
        }

        // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        } 
}


// Display Payment form

function displayPaymentForm(){
    let html = "<div class='row'><div class='col-75'><div class='container'><form id='validate'><div class='row'><div class='col-50'>"+
               "<h3>Delivery Address</h3><label for='fname'><i class='fa fa-user'></i> Full Name</label><input type='text' id='fname' name='fullname' placeholder='Kinsgton Reynard' required>"+
               "<label for='email'><i class='fa fa-envelope'></i> Email</label><input type='text' id='email' name='email' placeholder='kingston@example.com' required>"+
               "<label for='adr'><i class='fa fa-address-card-o'></i> Address</label><input type='text' id='adr' name='address' placeholder='10 South Road' required>"+
               "<label for='city'><i class='fa fa-institution'></i> City</label><input type='text' id='city' name='city' placeholder='Durham' required>"+
               "<div class='row'><div class='col-50'><label for='county'>Durham</label><input type='text' id='county' name='county' placeholder='Durham'required></div><div class='col-50'>"+
               "<label for='pcode'>Post Code</label><input type='text' id='pcode' name='pcode' placeholder='DH1 3DF' required></div></div></div><div class='col-50'><h3>Payment</h3>"+
               "<label for='fname'>Accepted Cards</label><div class='icon-container'><i class='fa fa-cc-visa' style='color:navy;'></i><i class='fa fa-cc-amex' style='color:blue;'></i><i class='fa fa-cc-mastercard' style='color:red;'></i>"+
               "<i class='fa fa-cc-discover' style='color:orange;'></i></div><label for='cname'>Name on Card</label><input type='text' id='cname' name='cardname' placeholder='Kinsgton Reynard'required>"+
               "<label for='ccnum'>Credit card number</label><input type='text' id='ccnum' name='cardnumber' placeholder='1111-2222-3333-4444'required><label for='expmonth'>Expiry Month</label><input type='text' id='expmonth' name='expmonth' placeholder='April'required>"+
               "<div class='row'><div class='col-50'><label for='expyear'>Expiry Year</label><input type='text' id='expyear' name='expyear' placeholder='2030'required></div><div class='col-50'><label for='cvv'>CVV</label><input type='text' id='cvv' name='cvv' placeholder='201'required>"+
               "</div></div></div></div><label><input type='checkbox' checked='checked' name='sameadr'> Shipping address same as billing address</label><button id='delivery' class='btn' type='submit'>Continue to checkout</button></form></div></div>"+
               "<div class='col-25'><div class='container'><div id='cartTotalQuantity'></div><div id='cart-checkout'></div><div id='cartTotalprice'></div></div></div></div>";

    document.getElementById('payD').innerHTML = html;
    
    
// Checkout Validation

// Check if all fields have been filled before checking out    

let delivery = document.getElementById('delivery');


delivery.addEventListener('click', async function(event) {

    try {
    event.preventDefault();
    
    let isValid = true;
    
    $('#validate input').each(function() {
      if ($(this).val() === ''){
          isValid = false;
        }
    });

    // Alert if all fields are complete and add order details to order history
    if(isValid === true){
        swal('Complete','Payment Complete. Your order is on the way','success');
        
        
        for (var i =0; i < LogHistory.length; i++){

            let parameters = {'newOrders':LogHistory[i]};

            let history = await fetch('http://127.0.0.1:8090/updateOrderHistory', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(parameters)
            });
            
            
            
        }
        
    }

    if(isValid === false){
        // Checkout Validation

            $('#validate').valid({
                roles: {
                    fullname: {
                        required: true,
                    },
                    email: {
                        required: true,
                    },
                    address: {
                        required: true,
                    },
                    city: {
                        required: true,
                    },
                    state: {
                        required: true,
                    },
                    zip: {
                        required: true,
                    },
                    cardname: {
                        required: true,
                    },
                    cardnumber: {
                        required: true,
                    },
                    expmonth: {
                        required: true,
                    },
                    expyear: {
                        required: true,
                    },
                    cvv: {
                        required: true,
                    },
                
                },
                messages: {
                    fullname:"Please input full name*",
                    email:"Please input email*",
                    city:"Please input city*",
                    address:"Please input address*",
                    county:"Please input county*",
                    pcode:"Please input post code*",
                    cardname:"Please input card name*",
                    cardnumber:"Please input card number*",
                    expmonth:"Please input expiry month*",
                    expyear:"Please input expiry year*",
                    cvv:"Please input cvv*",
                },
        });
    
    }
    }
    // Alert if Server is down
    catch(e){
        swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
    }

});  


}



 
 
// Checkout Functionality



async function checkout(){
    try {

        // Variables for checkout functionality
        var food = "";
        var cartlist = "";
        var total = 0;
        var totalquantity = 0;

        // Fetch items stored in checkout basket, contains exclusive details about food
        let response = await fetch('http://127.0.0.1:8090/checkout/order');
        let body = await response.json();   
        
        // Fetch items in cart, consists of FoodId and quantity
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();

        
        
        // Compare items in checkout and items in cart for matching IDs then add to List
        for (var i = 0; i < body.length; i++){

            var foodCountry = body[i].country;
            var foodName = body[i].name;
            var foodRestaurant = body[i].restaurant;
            var foodPrice = body[i].price;
            var foodImg = body[i].image;
            var foodId = body[i].optionId;
            var orderNumber = 0;

            if (cartBody.length != 0){
                    for (var j = 0; j < cartBody.length; j++){
                        if(cartBody[j].food === foodId){
                            orderNumber = cartBody[j].quantity;
                        }
                    }   
            }

            // Calculate for the total Price and the total number of orders
            total += (parseInt(orderNumber) * parseInt(foodPrice));
            totalquantity += orderNumber; 
            
            var html = "<div class='meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
                "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
                "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
                "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+
                "<div class='order_quantity'><p>Quantity: "+orderNumber+"</p> </div>";
                            
            var cartCheckout = "<p><a href='#'>"+foodName+"</a> <span class='price'>"+foodPrice+"</span></p>";
                                

            // let item = document.createElement(`li`)
            
            food += "<li>" + html + "</li>";
            

            cartlist += "<li>" + cartCheckout + "</li>";
            LogHistory.push(foodName);
            }

            // Display the Payment/ Address Form
            displayPaymentForm();

            // Render to HTML
            let container = document.getElementById('orders');
            container.innerHTML = food; 
            
            let totalPrice = document.getElementById('total_price');
            totalPrice.innerHTML = 'Total cost:<span>&#163;</span>'+total;

            let itemCheckoutList = document.getElementById('cart-checkout');
            itemCheckoutList.innerHTML = cartlist;


            let cartTotalQuantity = document.getElementById('cartTotalQuantity'); 
            cartTotalQuantity.innerHTML = "<h4>Cart <span class='price' style='color:black'><i class='fa fa-shopping-cart'></i> <b>"+totalquantity+"</b></span></h4>";

            let cartTotalprice = document.getElementById('cartTotalprice');
            cartTotalprice.innerHTML = "<p>Total <span class='price' style='color:black'><b><span>&#163;</span>"+total+"</b></span></p>";

    }

    // Alert if Server is down
    catch(e){
        swal('Notice','Your Cart is Empty','warning');
    }
    
}



// Display comments and users info on page load
window.addEventListener('load', async function(event){

    try {
    let userlogLoad = await fetch('http://127.0.0.1:8090/CurrentUserInfo');
    let userInfo = await userlogLoad.json();
    let renderCom = await fetch('http://127.0.0.1:8090/comment');
    let renderResp =  await renderCom.json();
    var itemComm = "";

    for(var i = 0; i < renderResp.length; i++){
        
        let cName = renderResp[i].customer;
        let cCom = renderResp[i].comment;
        let cEmail = renderResp[i].email;
        


        let html = "<div class = 'row no-gutters'> <div class='col-md-2'><div class='leftimg'><i style='font-size: 100px'; class='fa fa-user-circle' aria-hidden='true'></i></div></div>"+
                    "<div class='col-md-10'><div class='rightPanel'>"+
                    "<div class='commentBody'><span class='cName'>"+cName+"</span></br>"+cCom+"</div></div></div></div>";

        
        itemComm += "<li>" + html + "</li>";
    }
    let container = document.getElementById('AnonymousCommentArea');
    container.innerHTML = itemComm;

    
    // Display name of user on navigation bar
    document.getElementById('UserName').innerHTML = userInfo;

    
    // Display Current Users order history
    if (userInfo !== 'guest'){
        let userDatabase = await fetch('http://127.0.0.1:8090/userDatabase');
        let jsonDatabase = await userDatabase.json();
        let orderHistoryList = "";


        for(var j=0; j < jsonDatabase.length; j++){

            // Look for unique username in database
            if (jsonDatabase[j].user === userInfo){
                // Loop through the list and add previous orders to list
                for(var x = 0 ; x < jsonDatabase[j].prevOrders.length; x ++) {
                    orderHistoryList += "<li class='list-group-item' data-aos='fade-up'>" + jsonDatabase[j].prevOrders[x] + "</li>";
                }
            }
        }

        // Render order list into html
        document.getElementById('orderHistory').innerHTML = "<span class='subtitle' data-aos='fade-left'>Your</span>"+
        "<h2 class='title' data-aos='fade-right'>Order History</h2>"+
        "<div class='historyList list-group list-group-flush'>"+ orderHistoryList +"</div>";
    }
    else{
        // pass
    }
        
    }

    // Alert if Server is down
    catch(e){
        swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
    }


});

// Add Comment Functionality
let add_comment = document.getElementById('add_comment');

// Adds comments to Comment Database stores in JSON format and renders back to page
add_comment.addEventListener('click', async function(event){

    try {
    event.preventDefault();
    // Store comments in JSON file
    let customerName = document.getElementById('customerName').value;
    let customerEmail = document.getElementById('customerEmail').value;
    let newComment = document.getElementById('customerComment').value;

    let parameters = { 'newComment' : newComment,
                        'customerEmail':customerEmail,
                        'customerName': customerName};


    let response = await fetch('http://127.0.0.1:8090/comment/add', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(parameters)
    });

    // Fetch comments from JSON file and render them
    let renderCom = await fetch('http://127.0.0.1:8090/comment');
    let renderResp =  await renderCom.json();
    var itemComm = "";

    for(var i = 0; i < renderResp.length; i++){
        
        let cName = renderResp[i].customer;
        let cCom = renderResp[i].comment;
        let cEmail = renderResp[i].email;
        


        let html = "<div class = 'row no-gutters'> <div class='col-md-2'><div class='leftimg'><i style='font-size: 100px'; class='fa fa-user-circle' aria-hidden='true'></i></div></div>"+
                    "<div class='col-md-10'><div class='rightPanel'>"+
                    "<div class='commentBody'><span class='cName'>"+cName+"</span></br>"+cCom+"</div></div></div></div>";

        
        itemComm += "<li>" + html + "</li>";
    }
    let container = document.getElementById('AnonymousCommentArea');
    container.innerHTML = itemComm;
}

// Alert if server is down
catch(e){
    swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
}
});

// Onclick Functionality for when user chooses an category of food
// User Clicks food category, menu data is fetched from the JSON file 
// Menu is rendered onto the page wth innerHTML

async function country(){
    
    try {
    var food = "";
    // Fetch Menu
    let response = await fetch('http://127.0.0.1:8090/list');
    let body = await response.json();
    
    // Fetch Items present in Cart already
    let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
    let cartBody = await cartResponse.json();
    
    
    // Store Details of menu in variables
    for (var i = 0; i < body.country.length; i++){

        var foodCountry = body.country[i].country;
        var foodName = body.country[i].name;
        var foodRestaurant = body.country[i].restaurant;
        var foodPrice = body.country[i].price;
        var foodImg = body.country[i].image;
        var foodId = body.country[i].optionId;
        var orderNumber = 0;

    // Check for the quantity of each food ordered and store in variable
        if (cartBody.length != 0){
            for (var j = 0; j < cartBody.length; j++){
                if(cartBody[j].food === foodId){
                    orderNumber = cartBody[j].quantity;
                }
            }   
        }

        
        // Render details onto HTML page
        var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
        "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
        "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
        "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
        "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +" type='button' class='btn btn-outline-success'>+</button>"+
        "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
        "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

        


        food += "<li>" + html + "</li>";
    
    }
    
    renderThings(food);

    }

    // Alert if server is disconnected
    catch(e){
        swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
    }
}

async function burgers(){
    try {
        var food = "";
        // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

        // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();


        // Store Details of menu in variables
        for (var i = 0; i < body.burgers.length; i++){
    
            var foodName = body.burgers[i].name;
            var foodRestaurant = body.burgers[i].restaurant;
            var foodPrice = body.burgers[i].price;
            var foodImg = body.burgers[i].image;
            var foodId = body.burgers[i].optionId;
            var orderNumber = 0;

        // Check for the quantity of each food ordered and store in variable 
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
        // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";


        
            food += "<li>" + html + "</li>";
              
    
        }
        
        renderThings(food);
        
    
        }
    // Alert if server is disconnected
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function dessert(){
    try {
        var food = "";

    // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

    // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();

    // Store Details of menu in variables
        for (var i = 0; i < body.dessert.length; i++){
    
            var foodName = body.dessert[i].name;
            var foodRestaurant = body.dessert[i].restaurant;
            var foodPrice = body.dessert[i].price;
            var foodImg = body.dessert[i].image;
            var foodId = body.dessert[i].optionId;
            var orderNumber = 0;

    // Check for the quantity of each food ordered and store in variable 
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
            
    // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

        
            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);
    
        }
    // Alert if server is disconnected
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function chicken(){
    try {
        var food = "";

    // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

    // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();

    
    // Store Details of menu in variables
        for (var i = 0; i < body.chicken.length; i++){
    
            var foodName = body.chicken[i].name;
            var foodRestaurant = body.chicken[i].restaurant;
            var foodPrice = body.chicken[i].price;
            var foodImg = body.chicken[i].image;
            var foodId = body.chicken[i].optionId;
            var orderNumber = 0;
    
           
    // Check for the quantity of each food ordered and store in variable

            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
    
    
    // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

            
            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);

        
    
        }
    // Alert if server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function wine(){
    try {
        var food = "";

    // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

    // Fetch Items present in Cart already

        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();


        for (var i = 0; i < body.wine.length; i++){
    
            var foodName = body.wine[i].name;
            var foodRestaurant = body.wine[i].restaurant;
            var foodPrice = body.wine[i].price;
            var foodImg = body.wine[i].image;
            var foodId = body.wine[i].optionId;
            var orderNumber = 0;
        
    // Check for the quantity of each food ordered and store in variable

            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
    // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);
    
        }
    
    // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function pizza(){
    try {
        var food = "";

        // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

        // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();


        for (var i = 0; i < body.pizza.length; i++){
    
            var foodName = body.pizza[i].name;
            var foodRestaurant = body.pizza[i].restaurant;
            var foodPrice = body.pizza[i].price;
            var foodImg = body.pizza[i].image;
            var foodId = body.pizza[i].optionId;
            var orderNumber = 0;

        // Check for the quantity of each food ordered and store in variable
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
           
        // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

        
            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);

        }

        // Alert if Server is disconnected
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function sandwiches(){
    try {
        var food = "";

        // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

        // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();


        
        for (var i = 0; i < body.sandwiches.length; i++){
    
            var foodName = body.sandwiches[i].name;
            var foodRestaurant = body.sandwiches[i].restaurant;
            var foodPrice = body.sandwiches[i].price;
            var foodImg = body.sandwiches[i].image;
            var foodId = body.sandwiches[i].optionId;
            var orderNumber = 0;

        
        // Check for the quantity of each food ordered and store in variable
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
            
        // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

            food += "<li>" + html + "</li>";


        }
        
        renderThings(food);
    
        }

        // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function lunch(){
    try {
        var food = "";

    // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();

    // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();


        for (var i = 0; i < body.lunch.length; i++){
    
            var foodName = body.lunch[i].name;
            var foodRestaurant = body.lunch[i].restaurant;
            var foodPrice = body.lunch[i].price;
            var foodImg = body.lunch[i].image;
            var foodId = body.lunch[i].optionId;
            var orderNumber = 0;
        
    // Check for the quantity of each food ordered and store in variable
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
            
        
    // Render details onto HTML page
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";
            
            
            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);
    
        }

    // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}

async function breakfast(){
    try {
        var food = "";

    // Fetch Menu
        let response = await fetch('http://127.0.0.1:8090/list');
        let body = await response.json();
    
    // Fetch Items present in Cart already
        let cartResponse = await fetch('http://127.0.0.1:8090/addToCart');
        let cartBody = await cartResponse.json();

        for (var i = 0; i < body.breakfast.length; i++){
    
            var foodName = body.breakfast[i].name;
            var foodRestaurant = body.breakfast[i].restaurant;
            var foodPrice = body.breakfast[i].price;
            var foodImg = body.breakfast[i].image;
            var foodId = body.breakfast[i].optionId;
            var orderNumber = 0;

    // Check for the quantity of each food ordered and store in variable
            if (cartBody.length != 0){
                for (var j = 0; j < cartBody.length; j++){
                    if(cartBody[j].food === foodId){
                        orderNumber = cartBody[j].quantity;
                    }
                }   
            }
    
            
    // Render Items onto HTML
            var html = "<div class='col-md-3 meal'> <div class='food_img'> <img src='"+ foodImg + "'>" +
            "</div> <div class='food_name'> <h3>"+foodName+"</h3> </div>"+ 
            "<div class='food_restaurant'> <p> "+foodRestaurant+"</p> </div>"+ 
            "<div class='food_price'> <p><span>&#163;</span>"+foodPrice+"</p> </div>"+ 
            "<div class='addOrder'><button onclick='addFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-success'>+</button>"+
            "<span id='q"+foodId+"'>"+ orderNumber +"</span>"+ 
            "<button onclick='removeFood("+foodId+")' id="+ foodId +"type='button' class='btn btn-outline-danger'>-</button></div></div>";

    
            food += "<li>" + html + "</li>";
        }
        
        renderThings(food);
    
        }
    
    // Alert if server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
}











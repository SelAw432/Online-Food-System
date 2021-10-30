let page = document.getElementById('UserOptionPage');


// User Login Functionality


function GoTologinPage(){
    
    // Render Sign in form
    page.innerHTML = "<div class='userLoginForm'> <h1 class='font-weight-bold py-3'> LOGIN</h1><form class='signin' action='http://127.0.0.1:8090/signin' method='post'>"+ 
                     "<div class='form-row'><div class='col-lg-9'><input type='text' class='form-control' id='username' placeholder='Username' required></div></div><div class='form-row'>"+
                     "<div class='col-lg-9'><input type='password' class='form-control' id='password' placeholder='Password' required></div></div>"+
                     "<div class='form-row'><div class='col-lg-8'><button id='login' class='btn btn-lg btn-primary btn-block submit' type='submit'>Submit</button></div>"+
                     "<div class='col-lg-4'><button onclick='Goback()' class='btn btn-lg btn-primary btn-block submit'><i class='fa fa-angle-left' aria-hidden='true'></i>Back</button>"+
                     "</div></div></form></div>";
    let user = document.getElementById('login');

    // Checks the details entered by user when submit button is clicked
    user.addEventListener('click', async function(event){

        try {
        
        event.preventDefault();
        
        // Fetch database containing registered User and their details
        let getResponse = await fetch('http://127.0.0.1:8090/userDatabase');
        let body = await getResponse.json();
        var pass = false;
    
        let logUsername = document.getElementById('username').value;
        let logPassword = document.getElementById('password').value;
        
        // Cross check details to see if there are any matches
        for (var i =0; i < body.length; i++){
            // Return True if there is a match or else false
            if (body[i].user === logUsername && body[i].password === logPassword) {
                pass = true;
            }
        }

        // If there is a match store username to be displayed in home page
        if (pass === true ) {

                // Stores the Username
               let parameters = {'User':logUsername};
                    let postResponse = await fetch('http://127.0.0.1:8090/User', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(parameters)
                    });
                
                // Alerts of a succesful logging and redirect to home page
                swal("Welcome!", "Login Succesfull!", "success")
                .then((value) => {
                    location.href = '../home.html';
                });
 
            }

            // Alert if details are in correct or have no match
            else {
                swal("Error!", "Username or Password Invalid!", "error");
            }

        }
          
        // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
    });

}
    // Registration Option
function GoToRegisterPage(){

        
        // Render Register Page
        page.innerHTML = "<div class='userRegistrationForm'> <h1 class='font-weight-bold py-3'> Register</h1>"+
                     "<form class='register' action='http://127.0.0.1:8090/register' method='post'> <div class='form-row'><div class='col-lg-9'>"+
                     "<input type='text' class='form-control' id='regUsername' placeholder='Username' required></div></div><div class='form-row'>"+
                     "<div class='col-lg-9'><input type='text' class='form-control' id='regEmail' placeholder='Email' required></div></div><div class='form-row'>"+
                     "<div class='col-lg-9'><input type='password' class='form-control' id='regPassword' placeholder='Password' required></div></div>"+
                     "<div class='form-row'><div class='col-lg-9'><input type='password' class='form-control' id='regConfPassword' placeholder='Confirm Password' required></div></div>"+
                     "<div class='form-row'><div class='col-lg-8'><button id='newUser' class='btn btn-lg btn-primary btn-block submit' type='submit'>Submit</button></div>"+
                     "<div class='col-lg-4'><button onclick='Goback()' class='btn btn-lg btn-primary btn-block submit'><i class='fa fa-angle-left' aria-hidden='true'></i>Back</button>"+
                     "</div></div></form></div>";

        let new_users = document.getElementById('newUser');
        
        
        // Stores the details of the newly registered account in Database
        new_users.addEventListener('click', async function new_user(event){

            try {
            
            event.preventDefault();
                
            // Fetch the user database
            let getResponse = await fetch('http://127.0.0.1:8090/userDatabase');
            let body = await getResponse.json();
            var pass = true;
        
            let regUsername = document.getElementById('regUsername').value;
            let regEmail = document.getElementById('regEmail').value;
            let regPassword = document.getElementById('regPassword').value;
            let regConfPassword = document.getElementById('regConfPassword').value;
            
            // Cross check to see if there are any errors such as existing username or email, and unmatching passwords
            for (var i =0; i < body.length; i++){
                if (body[i].user === regUsername) {
                    swal("Error!", "'Username already exists'!", "error");
                    pass = false;
                }
                else if (body[i].userEmail === regEmail){
                    swal("Error!", "Email already exists!", "error");
                    pass = false;
                }
                else if (regPassword !== regConfPassword){
                    swal("Error!", "Password does not much!", "error");
                    pass = false;
                }
            }
            
            // If New details are valid Store into Database and redirect back to Login Page
            if (pass === true) {
        
                let parameters = { 'regUsername' : regUsername,
                                'regEmail':regEmail,
                                'regPassword': regPassword,
                                'regConfPassword': regConfPassword
                            };
        
        
                let response = await fetch('http://127.0.0.1:8090/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify(parameters)
                });
                
                swal("Congratulations!", "Sign Up Successful!", "success")
                .then((value) => {
                    Goback();
                });
                
            }


        }

        // Alert if Server is down
        catch(e){
            swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
        }
        });
}


    // Go back
function Goback(){
        page.innerHTML = "<div class='userSigninOptions'><h1 class='font-weight-bold py-3'> Continue .....</h1>"+
                         "<button onclick='LoginAsGuest()' class='btn btn-lg btn-primary btn-block submit'>Guest</button>"+
                         "<button onclick='GoTologinPage()' class='btn btn-lg btn-primary btn-block submit' type='submit'>Login</button>"+
                         "<button onclick='GoToRegisterPage()' class='btn btn-lg btn-primary btn-block submit' type='submit'>Register</button></div>";

}


// User Login Options Functionality


//Guest Login 
async function LoginAsGuest(event){
    try{
    
    let parameters = {'User':'guest'};
            let postResponse = await fetch('http://127.0.0.1:8090/User', {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(parameters)
                    });

    swal("Welcome!")
    .then((value) => {
    location.href = '../home.html';
    });
}

// Alert if Server is down
catch(e){
    swal('404 Error','Your Server May Be Disconnected, Please check your server', 'error');
}
}





    

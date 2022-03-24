function login(){
    //gets input from user and stores it into a variable
    let user = document.getElementById('Username').value;
    let pass = document.getElementById('Password').value;
    //retrives the JSON file in order to loop through every username and Password in the file and compare it to the inputs from the user, if it's a match it logs the client in, if not it sends them the pop up message

    fetch('./user.json')
        .then(response => response.json())
        .then(json=>{
            for(let i= 0; i < json.users.length; i++){
                if(user == json.users[i].Username && pass == json.users[i].Password){
                    window.location = "./home.html"
                    userLogged = json.users[i].id;
                    localStorage.setItem('userLoggedIn',`${userLogged}`)
                    return userLogged;
                }
            }
            //returns alert to notify user there was a problem logging in 
                if(user == ''){
                    alert("Please fill out the username to login!")
                } else if (pass == ''){
                    alert("Please fill out the password to login!")
                }else {
                    alert('The following Username and Password are Incorrect, Try again')

                }

        })
    }

$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

$('#btnLogin').click(function(){
    alert("Logged in!");
    // sending POST request to server
    // check if the user and the password is correct
    // enter to app / try to login again
    $('input').val("");
});

$('#btnCreateAccount').click(function(){
    alert("Account Created!");
    //check the params
    // post to the server the info
    $('input').val("");
});
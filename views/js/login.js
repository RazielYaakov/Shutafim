$('.message a').click(function(){
   $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

function clearInputs(){
    $('input[type="text"]').val("");
    $('input[type="password"]').val("");
    $('input[type="email"]').val("");
}

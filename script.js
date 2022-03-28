const recipeApp = {};

recipeApp.apiKey = 'bea4d5f528b740388bbadba32683c5f7'
recipeApp.apiURL = 'https://api.spoonacular.com/recipes/search'




$('form').on('submit', function(event) {
    event.preventDefault();
});


//trying out proxy server
recipeApp.getActivity = function() {  
$.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method:'GET',
    data: {
        reqUrl: 'http://www.boredapi.com/api/activity/',
        data: {
            "accessibility": recipeApp.active
        },
        proxyHeaders: {
            'Some-Header': 'goes here'
        },
    }
}).then(function(data) {
    activity = data.activity.toLowerCase();

}).fail(function(error){
    console.log(error);
});
}

recipeApp.getRecipe = function() {
    $.ajax({
        url: recipeApp.apiURL,
        dataType: 'json',
        method:'GET',
        data: {
            apiKey: recipeApp.apiKey,
            query: recipeApp.recipeQuery,
            diet: recipeApp.diet
        }
    })

    .then(function(data) {
         console.log(data);
        randomNumber = Math.floor(Math.random() * 10)
        recipeId = data.results[randomNumber].id
        recipe = data.results[randomNumber].title
    })

    .then(function(){
        $.ajax({
        url: `https://api.spoonacular.com/recipes/${recipeId}/information`,
        dataType: 'json',
        method:'GET',
        data: {
            apiKey: recipeApp.apiKey,
            query: recipeApp.recipeQuery,
            diet: recipeApp.diet
            }
        })

        .then(function(data) {
            recipeURL = data.sourceUrl
            console.log(data);

            //print results in html
            $('.results').html(`You should make some <a href="${recipeURL}">${recipe}</a> and ${activity}.`).addClass('visible');
        })

        .fail(function(error) {
            console.log(error);
            $('.results').html(`An error occured. Please try again.`).addClass('visible');
        })
    })
    
    .fail(function(error){
        console.log(error)
        //print results in html
        $('.results').html(`No suggestions. Please try again.`).addClass('visible');
    })
}

//initlialize
recipeApp.init = function() {
    $('form').on('submit', function(){
        recipeApp.recipeQuery = $("input[type=text]").val()
        recipeApp.diet = $("input[name='diet']:checked").val()
        recipeApp.activeLevel = $("input[name='active']:checked").val()

        recipeApp.getRecipe();
        recipeApp.getActivity();

        recipeApp.active = function(activityLevel) {
            if (recipeApp.activeLevel === "active")  {
                return Math.random().toFixed(1)
            }

            else if (recipeApp.activeLevel === "notActive") {
                return 0.0
            }
        };


       
        
    
    })

}


//document ready
$(function(){
   recipeApp.init();
})


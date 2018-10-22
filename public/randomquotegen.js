// Selectors
var quoteBox = $("#quote-box");
var body = $("body");
var newQuote = $("#new-quote");
var quoteText = $(".quote_text");


// List of gradients
var gradients = [
	{fallback: '#dae2f8', 
		m1: '-webkit-linear-gradient(to right, #dae2f8, #d6a4a4)', 
		m2:'linear-gradient(to right, #dae2f8, #d6a4a4)'} //borabora
	, {fallback: '#2BC0E4',
		m1:'-webkit-linear-gradient(to right, #EAECC6, #2BC0E4)', 
		m2: 'linear-gradient(to right, #EAECC6, #2BC0E4)'} //moonrise
	, {fallback:'#24c6dc',
		 m1:'-webkit-linear-gradient(to right, #24c6dc, #514a9d)', 
		 m2:'linear-gradient(to right, #24c6dc, #514a9d)'} //mantle
	, {fallback:'#dd5e89',
		 m1:'-webkit-linear-gradient(to right, #dd5e89, #f7bb97)', 
		 m2:'linear-gradient(to right, #dd5e89, #f7bb97)'} //pinky
	, {fallback:'#e55d87',
		 m1:'-webkit-linear-gradient(to right, #e55d87, #5fc3e4)', 
		 m2:'linear-gradient(to right, #e55d87, #5fc3e4)'} //rose water
	, {fallback:'#ff6e7f',
		 m1:' -webkit-linear-gradient(to right, #ff6e7f, #bfe9ff)', 
		 m2:'linear-gradient(to right, #ff6e7f, #bfe9ff)'} //noon to dusk
	, {fallback:'#ef32d9',
		 m1:'-webkit-linear-gradient(to right, #ef32d9, #89fffd)', 
		 m2:'linear-gradient(to right, #ef32d9, #89fffd)'} // azure pop
	, {fallback:'#12c2e9',
		 m1:'-webkit-linear-gradient(to right, #12c2e9, #c471ed, #f64f59)', 
		 m2:'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)'} // Jshine
	, {fallback:'##feac5e',
		 m1:'-webkit-linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)', 
		 m2:'linear-gradient(to right, #feac5e, #c779d0, #4bc0c8)'} //atlas
	, {fallback:'#fc00ff',
		 m1:'-webkit-linear-gradient(to right, #fc00ff, #00dbde)', 
		 m2:'linear-gradient(to right, #fc00ff, #00dbde)'}
];

function changeBackground(){
	var randNum = getRandGradNum();
	//console.log(randNum);
	body.fadeTo(1150, .5,'linear', function(){
		body.css({background: gradients[randNum]["fallback"]});
		body.css({background: gradients[randNum]["m1"]});
		body.css({background: gradients[randNum]["m2"]});
	}).fadeTo('slow',1, 'linear');

	newQuote.css({backgroundColor:gradients[randNum]["fallback"]});
	newQuote.css({backgroundColor:gradients[randNum]["m1"]});
	newQuote.css({backgroundColor:gradients[randNum]["m2"]});
}


function getRandGradNum(){
	return Math.floor(Math.random() * gradients.length)

}

function addQuote(){
    $.ajax( {
     type: "GET",
     dataType: "jsonp",
     url:  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
      success:function(json){
      	document.getElementById("text").innerHTML = json.quoteText;
      	if(json.quoteAuthor==""){
      		document.getElementById("author").innerHTML = "Unknown";
      	}
      	else{
      		document.getElementById("author").innerHTML = json.quoteAuthor;
      	}
      },
      error:function()
      {
      	alert("Ajax call failed");
     
      }    
    })
}

function fadeAndAddQuote(){
    quoteText.fadeOut(750, function(){
    	addQuote();
    	setTimeout(function(){
    		quoteText.fadeIn(750);
    	}, 400);
    	
    });
}
$(document).ready(function() {

	addQuote();
	newQuote.click(function(e) {
	    e.preventDefault();
	    changeBackground();
	    fadeAndAddQuote();
	  });
	$('#share_tweet').click(function(e){
		e.preventDefault();
		window.open('https://twitter.com/intent/tweet?text='+ '"' + 
			$('#text').text() + '" -' + $('#author').text());


	});
	$('#login_tumblr').click(function(e){
		e.preventDefault();
		window.open('https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=' 
			+ $('#author').text() + '&content=' + $('#text').text() 
			+ '&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button')
	});

});
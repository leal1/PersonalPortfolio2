	function addQuote(){
	    $.ajax( {
	      
	     type: "GET",
	     dataType: "jsonp",
	     
	     url:  "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?",
	     


	      success:function(json){
	      	document.getElementById("text").innerHTML = json.quoteText;
	      	console.log('ya');
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
$(document).ready(function() {

	addQuote();
	$('#new-quote').click(function(e) {
	    e.preventDefault();
	    addQuote();
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
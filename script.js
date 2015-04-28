var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615';
var userSearch;

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.
function searchCallback(results) {
	var count = 0;
	var cell = '';
	for (var i = 0; i < 9; i++){
	    var games = results[i];
	    	var otherInfo = '<br><div class="bonus"><br><strong>Game Description: </strong>' + games.deck + '</div>'
	    	cell += '<div class="col-md-4 well"><img class="img-thumbnail hidden-xs hidden-sm" src="' + games.image.icon_url + '"/><br><p class="lead">'  + games.name + '</p>' + otherInfo +'<button class="btn btn-sm btn-success removeBtn">Remove</button></div>';
			count++
			if (count == 3){
				$(".searchResults").append('<div class="row">' + cell + '</div>');
				count = 0;
				cell = '';
		};
	}
	console.log(results);
}



//search("batman");

$(document).ready(function() {
	$(".searchBtn").on("click", function(){
		userSearch = $("#searchField").val();
		search(userSearch);
	});

	$(".searchResults").on("click", ".removeBtn", function(){

		$(this).parent().remove();
	})
	
});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}

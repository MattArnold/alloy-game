/*jslint browser:true */
/*global $*/
/*jslint plusplus: true */
function example() {
    "use strict";
    return true;
}

// Bring in other files
var Handlebars = Handlebars,
_ = _,
playCards = playCards,
tiles = tiles,

// ---- Board template ----
boardtemplatesrc = $("#boardtemplate").html(),
boardtemplate = Handlebars.compile(boardtemplatesrc),
site = 0, tileslist = [], boardtemplatedata = {};

function setUpBoard(){
	var shuffledtiles = _.toArray( _.shuffle(tiles) );
		// emptyslots = [-9, -8, -7, -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
	_.forEach(shuffledtiles, function(tile){
		var tilerange = tile.range, positiverange = tilerange,
			destination, rndm, outcome = {};

		_.forEach(positiverange, function(num){
				if (num !== 0){
				var inverted = 0 - num;
				tilerange.push( inverted );
			}
		});

		rndm = _.random(0, tilerange.length - 1);
		destination = tilerange[rndm];
		if (destination < 0){ outcome.polarity = false;
		} else { outcome.polarity = true; }
		outcome.value = destination + '';
		outcome.title = tile.name;
		outcome.text = tile.text;
		tileslist[site] = outcome;
		++site;

		sortedtiles = _.sortBy( tileslist, function(tile){
			parsed = parseInt(tile.value);
			return parsed;
		} );

		boardtemplatedata.chosentiles = sortedtiles;

		// boardtemplatedata = _.take(boardtemplatedata, 19);
		$('#board').html( boardtemplate(boardtemplatedata) );

	});
}

$(document).ready( function(){

	localStorage.setItem('alloy',[]);

	playCards.setupCards(4); //# of players
	setUpBoard();


	var stuff = localStorage.getItem('cards');
	console.log(stuff);

});

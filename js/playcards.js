var playCards = (function() {

localStorage.setItem('cards',['a','b','c']);


var cardtypes = cardtypes;

var meter = 0;
var undovalue = 0;

var cards = [];

// events
var gainedacard;
var shuffled;

function Card(name) {
	this.uniqid = _.uniqueId();
	this.name = cardtypes[name].name;
	this.type = cardtypes[name].type;
	this.symbol = cardtypes[name].symbol;
	this.text = cardtypes[name].text;
	this.whenplayed = cardtypes[name].whenplayed;
	this.text = cardtypes[name].text;
	this.stackorder = 0; // Used for shuffling.
	this.zone = 'board';
}

function setupCards(i) {

	// Create all the cards that come in the game 'box'.
	_.forEach(cardtypes, function(type){
		_.times(5, function(){
			var newcard = new Card(type);
			cards.push(newcard);
		});
	});

	// Give each player their starting decks.

	var startingcards = ['Copper', 'Copper', 'Tin', 'Tin', 'Nickel', +
						'Nickel', 'Bismuth', 'Bismuth', 'Arsenic'];
	// _.forEach(startingcards, function(n){

	// 	_.times(i, function(p){
	// 		foundcard = _.find( cards, { name: n } );
	// 		card.player = p;
	// 		card.zone = 'net';
	// 	});
	// });

}

function gainCard(name) {
	card = _.find(cards, {'name': name, 'zone': 'board'});

	if ( card ){
		card.zone = 'net';
		return ' You gained a ' + card.name + ' card into your Net. ';
	} else {
		return ' There are no more ' + card.name + ' cards available to gain. ';
	}

}

function pickUp(id) {
	var msg,
		card = getCard(id);
	card.pay();
	if (attempt === 'success'){
		msg = playCards.gainCard( card.uniqid );
	} else {
		msg = 'You lack the energy to pick that up.';
	}
	$('#scene').append('<br>' + msg);
}

function dropCard(id) {
	var zone = cards[id].zone;
	if (zone != 'board'){ _.remove(zone, id); }

	cards[id].zone = 'board';
	return ' You dropped a ' + cards[id].name + ' card. ';
}

function getCard(id){
	return _.find(cards, {'uniqid': id} );
}

function shuffleDeck() {
	if ( getZoneSize('net') > 0 ){
		shuffled = true;

		var order = _.range( 0, cards.length );
		order = _.shuffle(order);

		var i = 0;
		_.forEach(cards, function(card){
			if (card.zone == 'net'){
				card.zone = 'deck';
			}
			card.stackorder = order[i];
			i++;
		});

		return 'Your net is shuffled to replenish your deck.';
	} else {
		return 'You have no cards in your net to shuffle.';
	}
}

function discardAllFrom(oldzone) {
	_.forEach(cards, function(card){
		if (card.zone === oldzone){
			card.zone = 'net';
		}
	});
}

function pullCards(i) {
	var drew = 0, youdrew = 'You drew ', singular = 'card.',
	plural = 'cards.', msg;

	_.times(i, function(){

		if ( getZoneSize('deck') === 0) {
			shuffleDeck();
			if (getZoneSize('deck') === 0) { return 'You have no cards in your net'+
			'to shuffle.';}
			msg = 'Your net is shuffled to replenish your deck.';
		}
		// Sort all the cards by stackorder. Get the first one with the zone
		// 'deck' and change it to 'hand'.
		var drawncard = _.chain(cards)
					.sortBy('stackorder')
					.find( { 'zone': 'deck' } )
					.value();

		// console.log('drew ', drawncard);

		_.forEach(cards, function(card){
			if (card.uniqid == drawncard.uniqid ){
				card.zone = 'hand';
			}
		});

		// console.log('deck ', _.pluck( cards, {'zone': 'deck'} ) );
		drew++;
	});

	msg = 'You drew ' + drew + ' cards.';
	return msg;
}

function useCard(id) {
	var activecard = getCard(id);
	activecard.zone = 'used';
	activecard.action(id);
}

function newTurn(){
	discardAllFrom('used');
	discardAllFrom('hand');
	var msg = pullCards(5);

	// Until one of them is at 0, repeatedly pay 1 energy and 1 decay.
	while (bank.energy > 0 && bank.decay > 0){
		bank.energy--;
		bank.decay--;
	}

	// Pay 1 Energy for a new turn, or gain a Fatigue card.
	if (bank.energy > 0) {
		bank.energy--;
	} else {
		msg = msg + 'You did not have 1 Energy to pay for a new turn, so'+
		'instead... ';
		msg = msg + gainCard('Fatigue');
	}

	return msg;
}

// In order to deduct from balance, 'amt' must be a negative #.
function changeMeter(amt){
	undovalue = meter;
	meter = meter + amt;
}

// Sometimes this returns 'failure' even for gaining, because the
// player must have to have space in the meter to gain the whole
// amount being given by a particular card instruction.
// Otherwise they gain zero. A card can get around this by
// splitting it into multiple instructions. Example: The player
// has 5 energy. "Gain 8 energy" fails completely.
// "Gain 4 energy. Gain 4 energy." succeeds with 4, then fails
// with 4.

function getZoneSize(zone){
	var sizes = _.countBy(cards, 'zone');
	if ( sizes[zone] ){
		return sizes[zone];
	} else {
		return 0;
	}
}

function getCardMenu(){
	// Each item in menu is card name, with an array of 3 elements:
	// the quantity available of that card, the cost of that card, &
	// the uniqid of the first copy of that card on the board.
	var amounts, ids = {}, menu = {};

	amounts = _.chain(cards)
			.filter({'zone': 'board'})
			.countBy('name')
			.toArray()
			.value();

	ids = _.chain(cards)
			.filter({'zone': 'board'})
			.unique('name')
			.map('uniqid')
			.toArray()
			.value();

	symbols = _.chain(cards)
			.filter({'zone': 'board'})
			.unique('name')
			.map('symbol')
			.toArray()
			.value();

	menu = _.zip(amounts, ids, symbols);

	return menu;
}

function getAllCards(){ return cards; }

function getDeck(){ return _.filter(cards, {'zone': 'deck'} ); }

function getHand(){ return _.filter(cards, {'zone': 'hand'} ); }

function getUsed(){ return _.filter(cards, {'zone': 'used'} ); }

return {
	// retrieve state
	shuffled: function(){ return shuffled; },
	getMeter: function(){ return meter; },
	getZoneSize: getZoneSize,
	getAllCards: getAllCards,
	getDeck: getDeck,
	getHand: getHand,
	getUsed: getUsed,
	getCardMenu: getCardMenu,
	getCard: getCard,
	// change state
	setupCards: setupCards,
	changeMeter: changeMeter,
	gainCard: gainCard,
	pickUp: pickUp,
	dropCard: dropCard,
	shuffleDeck: shuffleDeck,
	discardAllFrom: discardAllFrom,
	pullCards: pullCards,
	useCard: useCard,
	newTurn: newTurn
};

})();

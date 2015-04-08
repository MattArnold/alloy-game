var tiles = {
	'Iron Mine': {
		range: [9],
		name: 'Iron Mine',
		text: 'Gain an Iron card.',
		workerin: function(){
			playCards.gainCard('Iron');
		}
	},
	'Stream': {
		range: [8, 7, 6],
		name: 'Stream',
		text: 'Gain 3 Gold nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Gold') );
		}
	},
	'Forest': {
		range: [5, 4, 3, 2],
		name: 'Stream',
		text: 'Gain 3 Charcoal nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Charcoal') );
		}
	},
	'Slag Pit': {
		range: [3, 2, 1],
		name: 'Slag Pit',
		text: 'When this pawn returns to you, trash a card from ' +
		'your deck and re-shuffle it.',
		workerin: function(){},
		workerout: function(){
			// Display all cards, trash selected card
			// Re-shuffle
		}
	},
	'Bronze Smelter': {
		range: [0, 9],
		name: 'Bronze Smelter',
		text: 'Gain a Bronze card.',
		workerin: function(){
			playCards.gainCard('Bronze');
		},
		workerout: function(){}
	},
	'Brass Smelter': {
		range: [1],
		name: 'Brass Smelter',
		text: 'Gain a Brass card.',
		workerin: function(){
			playCards.gainCard('Brass');
		},
		workerout: function(){}
	},
	'Pewter Smelter': {
		range: [1],
		name: 'Pewter Smelter',
		text: 'Gain a Pewter card.',
		workerin: function(){
			playCards.gainCard('Pewter');
		},
		workerout: function(){}
	},
	'Copper Outcrop': {
		range: [2],
		name: 'Copper Outcrop',
		text: 'Gain 3 Copper nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Copper') );
		},
		workerout: function(){}
	},
	'Tin Outcrop': {
		range: [2],
		name: 'Tin Outcrop',
		text: 'Gain 3 Tin nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Tin') );
		},
		workerout: function(){}
	},
	'Nickel Outcrop': {
		range: [3],
		name: 'Nickel Outcrop',
		text: 'Gain 3 Nickel nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Nickel') );
		},
		workerout: function(){}
	},
	'Bismuth Outcrop': {
		range: [3],
		name: 'Bismuth Outcrop',
		text: 'Gain 3 Bismuth nuggets.',
		workerin: function(){
			_.times(3, playCards.gainNugget('Bismuth') );
		},
		workerout: function(){}
	},
	'Copper Mine': {
		range: [4],
		name: 'Copper Mine',
		text: 'Gain a Copper card.',
		workerin: function(){
			playCards.gainCard('Copper');
		},
		workerout: function(){}
	},
	'Tin Mine': {
		range: [4],
		name: 'Tin Mine',
		text: 'Gain a Tin card.',
		workerin: function(){
			playCards.gainCard('Tin');
		},
		workerout: function(){}
	},
	'Nickel Mine': {
		range: [5],
		name: 'Nickel Mine',
		text: 'Gain a Nickel card. Draw a card.',
		workerin: function(){
			playCards.gainCard('Nickel');
			playCards.pullCards(1);
		},
		workerout: function(){}
	},
	'Bismuth Mine': {
		range: [5],
		name: 'Bismuth Mine',
		text: 'Gain a Bismuth card. Draw a card.',
		workerin: function(){
			playCards.gainCard('Bismuth');
			playCards.pullCards(1);
		},
		workerout: function(){}
	},
	'Road': {
		range: [0],
		name: 'Road',
		text: 'Move this worker in either direction. Stop when ' +
			'it reaches an unoccupied site. Use the effect of ' +
			'that site.',
		workerin: function(){
			// Move pawn.
		},
		workerout: function(){}
	},
	'Arsenic Mine': {
		range: [5],
		name: 'Arsenic Mine',
		text: 'Gain a Arsenic card. Draw a card.',
		workerin: function(){
			playCards.gainCard('Arsenic');
		},
		workerout: function(){}
	},
	'Zinc Mine': {
		range: [6],
		name: 'Zinc Mine',
		text: 'Gain a Zinc card. Draw a card.',
		workerin: function(){
			playCards.gainCard('Zinc');
		},
		workerout: function(){}
	},
	'Lead Mine': {
		range: [6],
		name: 'Lead Mine',
		text: 'Gain a Lead card. Draw a card.',
		workerin: function(){
			playCards.gainCard('Lead');
		},
		workerout: function(){}
	}
};


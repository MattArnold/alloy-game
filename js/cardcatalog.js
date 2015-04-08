var cardtypes = {
	'Bronze': {
		name: 'Bronze',
		symbol: '0',
		whenplayed: function(){
			playCards.changeMeter(0);
		},
		score: 1,
		text: 'Play as 0. Value: 1 victory point.',
		type: 'metal'
	},
	'Brass': {
		name: 'Brass',
		symbol: '4',
		whenplayed: function(){
			playCards.changeMeter(4);
		},
		score: 0,
		text: 'Play as 4.',
		type: 'metal'
	},
	'Pewter': {
		name: 'Pewter',
		symbol: '-4',
		whenplayed: function(){
			playCards.changeMeter(-4);
		},
		score: 0,
		text: "Play as -4.",
		type: 'metal'
	},
	'Copper': {
		name: 'Copper',
		symbol: '1',
		whenplayed: function(){
			playCards.changeMeter(1);
		},
		score: 0,
		text: "Play as 1. When you draw this, draw 1 card.",
		whendrawn: function(){
			playCards.pullCards(1);
		},
		type: 'metal'
	},
	'Tin': {
		name: 'Tin',
		symbol: '-1',
		whenplayed: function(){
			playCards.changeMeter(-1);
		},
		score: 0,
		text: "Play as -1. When you draw this, draw 1 card.",
		whendrawn: function(){
			playCards.pullCards(1);
		},
		type: 'metal'
	},
	'Nickel': {
		name: 'Nickel',
		symbol: '2',
		whenplayed: function(){
			playCards.changeMeter(2);
		},
		score: 0,
		text: "Play as 2.",
		type: 'metal'
	},
	'Bismuth': {
		name: 'Bismuth',
		symbol: '-2',
		whenplayed: function(){
			playCards.changeMeter(-2);
		},
		score: 0,
		text: "Play as -2.",
		type: 'metal'
	},
	'Zinc': {
		name: 'Zinc',
		symbol: '3',
		whenplayed: function(){
			playCards.changeMeter(3);
		},
		score: 0,
		text: "Play as 3.",
		type: 'metal'
	},
	'Lead': {
		name: 'Lead',
		symbol: '-3',
		whenplayed: function(){
			playCards.changeMeter(-3);
		},
		score: 0,
		text: "Play as -3.",
		type: 'metal'
	},
	'Arsenic': {
		name: 'Arsenic',
		symbol: '1/-1',
		whenplayed: function(){
			$('arsenicModal').show();
		},
		score: 0,
		text: "Play as -3.",
		type: 'metal'
	}
};
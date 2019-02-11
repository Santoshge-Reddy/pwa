Ball.Preloader = function(game) {};
Ball.Preloader.prototype = {
	preload: function() {
		this.preloadBg = this.add.sprite((Ball._WIDTH-297)*0.5, (Ball._HEIGHT-145)*0.5, 'preloaderBg');
		this.preloadBar = this.add.sprite((Ball._WIDTH-158)*0.5, (Ball._HEIGHT-50)*0.5, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('ball', 'images/ball.png');
		this.load.image('hole', 'images/hole.png');
		this.load.image('element-w', 'images/element-w.png');
		this.load.image('element-h', 'images/element-h.png');
		this.load.image('panel', 'images/panel.png');
		this.load.image('title', 'images/title.png');
		this.load.image('button-pause', 'images/button-pause.png');
		this.load.image('screen-bg', 'images/screen-bg.png');
		this.load.image('screen-mainmenu', 'images/screen-mainmenu.png');
		this.load.image('screen-howtoplay', 'images/screen-howtoplay.png');
		this.load.image('border-horizontal', 'images/border-horizontal.png');
		this.load.image('border-vertical', 'images/border-vertical.png');

		this.load.spritesheet('button-audio', 'images/button-audio.png', 35, 35);
		this.load.spritesheet('button-start', 'images/button-start.png', 146, 51);

		this.load.audio('audio-bounce', ['audio/bounce.ogg', 'audio/bounce.mp3', 'audio/bounce.m4a']);
	},
	create: function() {
		this.game.state.start('MainMenu');
	}
};
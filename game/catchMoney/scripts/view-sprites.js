var game = this.game || (this.game ={});
var createjs = createjs || {};

;(function(game, cjs){
	
	(game.sycee = function(){
		cjs.Bitmap.call(this, game.loader.getResult("money"));
		this.x = 0;
		this.y = 0;
		this.scaleX = 0.2;
		this.scaleY = 0.2;
	}).prototype = Object.create(cjs.Bitmap.prototype);

	(game.diamond = function(){
		cjs.Container.call(this);
		var data = {
			framerate: 16,
			images: [game.loader.getResult("diamond")],
			frames: {width: 90, height:90}
		}
		var spritesheet = new cjs.SpriteSheet(data);
		var diamondSprite = new cjs.Sprite(spritesheet);
		diamondSprite.gotoAndPlay(0);
		//diamondSprite.framerate = 20;
		diamondSprite.scaleX = diamondSprite.scaleY = 0.5;
		this.addChild(diamondSprite);
	}).prototype = Object.create(cjs.Container.prototype);

	(game.diamondBoard = function(){
		cjs.Container.call(this);
		var background =  new cjs.Bitmap(game.loader.getResult("diamondsBoard"));
		background.x = 0;
		background.y = 0;
		var text = new cjs.Text("0", "20px Impact", "#000");
		text.textBaseline = 'middle';
		text.x = background.getBounds().width / 2 + 25;
		text.y = background.getBounds().height / 2;
		console.log(text.x, text.y);
		text.textAlign = 'center';
		this.addChild(background);
		this.addChild(text);
		this.x = 10;
		this.y = 10;

		this.addNumberText = function(){
			text.text = parseInt(text.text) + 1;
		}
		this.getNumber = function(){
			return text.text;
		}
	}).prototype = Object.create(cjs.Container.prototype);

	(game.clock = function(){
		cjs.Container.call(this);
		var clockPic = new cjs.Bitmap(game.loader.getResult('clock'));
		clockPic.x = 50;
		clockPic.y = 10;
		var text = new cjs.Text('00:00', "20px Impact", "#000");
		text.textBaseline = 'middle';
		text.x = 0;
		text.y = 24.5;

		this.addChild(clockPic);
		this.addChild(text);
		this.x = game.setting.gameWidth - 80;
		this.y = 10;
		
		this.showTime = function(timeSpan){
			var now = new Date(timeSpan),
				str = '',
				delta = 1000/60

			var second = now.getSeconds();
			if (Math.floor(second / 10) === 0) {
				str += '0';
				str += second;
			}else{
				str += second;
			}
			str += ':'

			if (second === game.setting.gameTimeout) {
				console.log('timeout')
				this.dispatchEvent(new game.helper.stopGenerateDiamondEvent());
				str += '00';
				text.text = str;
				return;
			};

			var millionSecond = Math.floor(now.getMilliseconds() / delta)
			if (Math.floor(millionSecond / 10) === 0) {
				str += '0';
				str += millionSecond;
			}else{
				str += millionSecond;
			}
			text.text = str;

		}
	}).prototype = Object.create(cjs.Container.prototype);

	(game.cat = function(){
		cjs.Bitmap.call(this, game.loader.getResult("cat"));
		//this.x = game.setting.gameWidth/2-this.getBounds().width*this.scaleX/2;
		this.y = 0;
		this.scaleX = 0.5;
		this.scaleY = 0.5;
		this.x = game.setting.gameWidth/2-this.getBounds().width*this.scaleX/2;
	}).prototype = Object.create(cjs.Bitmap.prototype);

}).call(this, game, createjs)
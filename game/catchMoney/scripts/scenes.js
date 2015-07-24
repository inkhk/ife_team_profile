var game = this.game || (this.game = {});

;(function(){
	var scene = game.scene = {
		node: document.querySelector('.scene'),
		setup: function(){},
		onShow: function(){},
		show: function(){
			this.node.classList.remove('out');
			this.node.classList.add('in');
			this.onShow();
		},
		hide: function(){
			this.node.classList.remove('in');
			this.node.classList.add('out');
		}
	}

	var startScene = game.startScene = Object.create(scene);
	//TODO
	

	var gameOverScene = game.gameOverScene = Object.create(scene);
	//TODO
})
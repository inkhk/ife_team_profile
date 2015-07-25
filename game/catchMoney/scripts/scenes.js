var game = this.game || (this.game = {});
//对不起我把原有的代码换成了小白版本...by inkhk
     window.onload = function() {
            var button = document.getElementById('start-btn');
            button.onclick = function(e) {
                document.getElementById('gamebg').style.display = 'none';
                document.getElementById('canvas').style.display = 'block';
                game.start();
            }
        }
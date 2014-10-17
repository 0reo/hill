var Hill = {
	start: function(){
		Crafty.init(500,350, document.getElementById('game'));
		//Crafty.background('rgb(249, 223, 125)');
	//	Crafty.scene('Game');


		Crafty.c('Actor', {
			init: function() {
				this.requires('2D, Canvas, Color, Collision, WiredHitBox')
				.collision();
			},
		});

		//hill
		Crafty.c("Hill", {
			init: function(){
				this.requires('Actor')
				.attr({ w: 1, h: 100});
			//	.onHit("Player", function(h){console.log(h)});
			}
		});
	
		//main char
		Crafty.e('Actor, Twoway, Gravity, Player')
		.attr({x: 0, y: 0, w: 10, h: 10})
		.color('#00bff3')
		.twoway(4, 0)
		.onHit("Hill", function(h){
		//	console.log(this._falling);
			this.antigravity();
			this.falling = false;
			this.y = h[0].obj.y - this.h;
			console.log(h[0], this._falling);	
		}, function(){
	//		this.gravity();
		})
		.gravity()
		.gravityConst(0.1);

		var _x = 0;
		var _w = 0;
		while (_x < 500)
		{
			_w += Math.random() * 21;
			Crafty.e("Hill").attr({x:_x ,y:250, w: _w}).color(getRandomColor());
			_x += _w;
		}
		//floor
//		Crafty.e('Floor, 2D, Canvas, Color')
//		.attr({x:0, y:250, w:250, h:2})
//		.color('green');
	}
}

window.onload = function(){
	Hill.start();
}


function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

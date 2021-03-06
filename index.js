var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render:render });




function preload() {
	game.load.image('tiles', 'simpleTiles.png');
	game.load.image('sky', 'assets/8-bitvalley.png');
	game.load.spritesheet('iggy', 'assets/iggy.png', 40, 35, 14);
	game.load.image('diamond', 'assets/blueDiamond.png', 21 ,19);

	game.load.tilemap('level1', '/assets/map.csv', null, Phaser.Tilemap.csv);
    	

}

var player;
var facing = 'right';
var platforms;
var cursors;
var jumpButton;
var sky;
var map;
var layer;
var score = 0;
var scoreString = '';
var scoreText;
var diamond;
var diamonds;
var i = 0;



function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);	

//starting background
	game.add.sprite(0, 0, 'sky');
	
	//iggy walking
	player = game.add.sprite(-700, 850, 'iggy');
	player.animations.add('walk');
	player.animations.add('left', [7, 8, 9, 10], 14, true);
    player.animations.add('turn', [4], 20, true);
    player.animations.add('right', [0, 1, 2, 3], 14, true);
    player.animations.add('Ljump', [13], 14, true);
    player.animations.add('Rjump', [12], 14, true); 

	//2nd number is how fast the frames go
	player.animations.play('walk', 7, true);
	
	//sprite size
	player.scale.set(1.1);
	player.smoothed = false;

	

	//map tiles
	map = game.add.tilemap('level1', 16, 16);

    //  Now add in the tileset
    map.addTilesetImage('tiles');
    
    
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();


    map.setCollisionBetween(0, 115);

    map.debug = true;
    

	game.world.setBounds(0, 0, 1344, 944);

    //camera following iggy
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
   
   //scoreString = 'Score : ';
    //scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });

   diamonds = game.add.group();

    //  We will enable physics for any diamond that is created in this group
    diamonds.enableBody = true;


    
    for (var i = 0; i < 20; i++)
    {
        //  Create a diamond inside of the 'diamonds' group
        var diamond = diamonds.create(i * 70, 100, 'diamond');


        //  Let gravity do its thing
        diamond.body.gravity.y = 300;

     

          scoreText = game.add.text(16, 16,'score: ', { fontSize: '32px', fill: '#000' });

    }

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    player.body.gravity.y = 500;

}
function update() { 

	 game.physics.arcade.overlap(player, diamonds, collectDiamond, null);


    game.physics.arcade.collide(player, layer);
	game.physics.arcade.collide(diamonds, layer);
	
    player.body.velocity.x = 0;
  
    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down && (facing =!'left'))) 
    {
        player.body.velocity.y = -350;
        player.animations.play('Ljump');
        
       	
		}
		if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down && (facing != 'right')))
        {
                player.body.velocity.y = -350;
                player.animations.play('Rjump');
		};
		
    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -150;

        if (facing != 'left')
        {
            player.animations.play('left');
            facing = 'left';
        }
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 150;

        if (facing != 'right')
        {
            player.animations.play('right');
            facing = 'right';
        }
    }
    else
    {
        if (facing != 'idle')
        {
            player.animations.stop();

            if (facing == 'left')
            {
                player.frame = 6;
            }
            else
            {
                player.frame = 0;
            }

            facing = 'idle';
        }
    }
}    







function collectDiamond (player, diamond) {
    
    // Removes the diamond from the screen
    diamond.kill();

    //  Add and update the score
    score += 1;
    scoreText.text = 'Score: ' + score;

    if (score >= 20){
    Text = game.add.text(50, 50,'you found all the treasure! ', { fontSize: '32px', fill: '#000' });
};
};

function render() {

	
	}

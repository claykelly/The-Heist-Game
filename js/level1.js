 // Game state

var level1 = {


    preload: function() {
        // load all assets and spritesheets
    },

    create: function(){
        // set background

        // add phaser physics arcade
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // create a group of walls
        walls = game.add.group();

        // enable physics for any object that is created in this group
        walls.enableBody = true;

        // build walls
        // var ground = platforms.create(0, game.world.height - 64, 'ground');

        // stop walls from falling away when collision occurs 
        // ground.body.immovable = true;

        // create a group of accessories (desk, chairs, grass)
        accessories = game.add.group();

        // enable physics for any object that is created in this group
        accessories.enableBody = true;

        // place accessories
        // var ground = platforms.create(0, game.world.height - 64, 'ground');


        

        
    },

	initTilemap: function(){
		let map = game.add.tilemap('map1')
		this.map = map;

		map.addTilesetImage('walls-and-floor-bank-1', 'wallsAndFloor');
		map.addTilesetImage('grass-tiles-2-small', 'grass');
		map.addTilesetImage('camera diagonal (1)', 'camera');
		map.addTilesetImage('chair', 'chair');
		map.addTilesetImage('hint', 'Collision-Hint');
		map.addTilesetImage('desk', 'Desk');
		map.addTilesetImage('money', 'money');


		let collisionLayer = map.createLayer('Collision');
		this.collisionLayer = collisionLayer;


		collisionLayer.visible = false;


		map.setCollisionByExclusion([], ture, this.collisionLayer);


		collisionLayer.resizeWorld();


		this.initPlayer();

		map.create('Foreground');

		let exit = this.map.objects.Meta.find( o => 0.name == 'exit');
		this.exitRect = new Phaser.Rectangle(exit.x, exit.y, exit.width, exit.height); 
	},

	initPLayer: function() {
    var player = game.add.sprite(0, 0, 'robber');
    this.player = player;

    // basic stuff, the MOVE_SPEED is the same as the
    // max speed of the virtual game pad
    player.MOVE_SPEED = 150;
    player.anchor.set(0.5);
    player.scale.set(0.2);
    player.animations.add('up', [0,1,2,3,4], 0, true);
    player.animations.add('left', [5,6,7,8,9], 0, true);
    player.animations.add('down', [11,10,11,12,13], 0, true);
    player.animations.add('right', [14,15,16,17,18], 0, true);
    player.play('up');

    // enable physics arcade
    // so phaser will take care of collision for us
    game.physics.arcade.enable(player);

    // set a custom smaller collision box for our player's sprite
    // so our player can fit into those area that have smaller walkable space
    player.body.setSize(100, 150, 100, 50);

    // keep the camera following our player throughout
    game.camera.follow(player);
  },
  update: function() {

    this.updatePlayer();

    // let phaser handle our player collision with the collision layer
    game.physics.arcade.collide(this.player, this.collisionLayer);
  },
  updatePlayer: function() {
    // shorthand so i don't have to reference this all the time
    var keyboardCursors = this.keyboardCursors;
    var wasd = this.wasd;
    var player = this.player;
    var moveSpeed = this.moveSpeed;
    var joystick = this.joystick;

    // set our player's velocity to 0
    // so the sprite doesn't move when there is no input from our player
    player.body.velocity.x = 0;
    player.body.velocity.y = 0;

    // keyboard movement
    // left and right keyboard movement
    if (cursors.left.isDown) {
    	moveSpeed.x = -player.MOVE_SPEED;
    	player.body.velocity.x = moveSpeed.x;
    	player.animations.play("left");
    }
    else if (cursors.right.isDown) {
    	moveSpeed.x = player.MOVE_SPEED;
    	player.body.velocity.x = moveSpeed.x;
    	player.animations.play("right");
    }
    else {
    	moveSpeed.x = 0;
    	player.frame = 0;
    }

    // up and down keyboard movement
    if (cursors.up.isDown) {
    	moveSpeed.y = -player.MOVE_SPEED;
    	player.body.velocity.y = moveSpeed.y;
    	player.animations.play("down");
    }
    else if (cursors.down.isDown) {
    	moveSpeed.y = player.MOVE_SPEED;
    	player.body.velocity.y = moveSpeed.y;
    	player.animations.play("up");
    }
    else {
    	moveSpeed.y = 0;
    	player.frame = 0;
    }
  }
}


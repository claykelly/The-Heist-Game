// Game state

var level1 = {

    preload: function() {
        // load all assets and spritesheets

        // TODO: Chang to github path
        // This loads the tilemap from Tiled into phaser. To do this you must export
        // the tiled file as a .json file and then load the .json file as well as all of the
        // tile sets that come with it
        game.load.tilemap('map1', 'assets/map1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('terrain-assets', 'assets/terrain-assets.png');
        game.load.image('accessories_tile', 'assets/accessories_tile.png');
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
        game.load.spritesheet('cop', 'assets/cop.png', 32, 48, 18);

    },

    create: function() {

        // Load the map
        map = game.add.tilemap('map1');

        // Here we must add in all the tilesets that we used in our map.
        // the tileset must be named according to what it is named in the tiled editor
        // (i.e. what you saved/named the tileset as)
        map.addTilesetImage('terrain-assets');
        map.addTilesetImage('accessories_tile');

        // the parameter is what the layer is ***called in tiled***
        Floor = map.createLayer('Floor');
        WallsAccessories = map.createLayer('WallsAccessories');

        // collision with walls and accessories
        map.setCollisionBetween(1, 2000, true, 'WallsAccessories');

        Floor.resizeWorld();

        // Add robber character
        player = game.add.sprite(600, 600, 'robber');
        player.frame = 0;
        
        // Give robber physics
        game.physics.arcade.enable(player); 

        // Add animation to player
        player.animations.add('down', [1, 2, 3, 4], 10, true);
        player.animations.add('up', [14, 15, 16, 17], 10, true);
        player.animations.add('right', [9, 10, 11, 12], 10, true);
        player.animations.add('left', [5, 6, 7, 8], 10, true);
        
               

        // game border collision
        player.body.collideWorldBounds = true;

        // anchor player
        player.anchor.setTo(0.5, 0.5);

        // Get camera to follow player
        game.camera.follow(player);

        // Add a test security camera for detection testing
        // We should make this into a function in order to make
        // Multiple security guards easily
        guards = game.add.group();
        securityGuard = game.add.sprite(800, 600, 'cop');
        securityGuard.frame = 0;
        game.physics.arcade.enable(securityGuard);
        securityGuard.animations.add('down', [1, 2, 3, 4], 10, true);
        guards.add(securityGuard);
        securityGuard.body.velocity.y = 75;

        // ***** Ray Casting ****** //
        bitmap = game.add.bitmapData(3200, 3200);
        bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
        game.add.image(0, 0, bitmap);


        // Add cursor keys in order to move around the map
        cursors = game.input.keyboard.createCursorKeys();

        // add phaser physics arcade
        game.physics.startSystem(Phaser.Physics.ARCADE);

    },
    update: function() {
        // Update function

        // Update the shadow texture each frame
        // this.updateShadowTexture();

        // player collision
        game.physics.arcade.collide(player, WallsAccessories);



        // ***** Ray Casting ***** //

        // Clear the bitmap where we are drawing our lines
        bitmap.context.clearRect(0, 0, 3200, 3200);

        // Ray casting!
        // Test if each camera can see the player by casting a ray (a line) towards the ball.
        // If the ray intersects any walls before it intersects the ball then the wall
        // is in the way.
        guards.forEach(function(securityGuard) {
            // Define a line that connects the person to the ball
            // This isn't drawn on screen. This is just mathematical representation
            // of a line to make our calculations easier. Unless you want to do a lot
            // of math, make sure you choose an engine that has things like line intersection
            // tests built in, like Phaser does.
            var ray = new Phaser.Line(securityGuard.x, securityGuard.y, player.x + 16, player.y + 16);

            // Test if any walls intersect the ray
            var intersect = false;//this.getWallIntersection(ray);

            if (ray.length > 200 ) {//&& intersect) {
                // A wall is blocking this persons vision so change them back to their default color
                securityGuard.tint = 0xffffff;
            } else {
                // This person can see the ball so change their color
                securityGuard.tint = 0x0000ff;

                // Draw a line from the ball to the person
                bitmap.context.beginPath();
                bitmap.context.moveTo(securityGuard.x + 16, securityGuard.y + 16);
                bitmap.context.lineTo(player.x, player.y);
                bitmap.context.stroke();
            }
        }, this);

        // This just tells the engine it should update the texture cache
        bitmap.dirty = true;

        // for testing loop the "securityGuard" in a path      
        if (securityGuard.body.velocity.y > 0 && securityGuard.y > 800 ||
                securityGuard.body.velocity.y < 0 && securityGuard.y < 600) {
            securityGuard.body.velocity.y *= -1; 
            securityGuard.animations.play('down');
        }

        // *** Player Movement ***        
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
    
        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -500;
            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 500;
            player.animations.play('right');
        }
        else if (cursors.down.isDown) 
        {
            // Move down
            player.body.velocity.y = 500;
            player.animations.play('down');
        }
        else if (cursors.up.isDown) 
        {
            // Move up
            player.body.velocity.y = -500;
            player.animations.play('up');
        }
        else {
            player.animations.stop();
            player.frame = 0;
        }
    }
}
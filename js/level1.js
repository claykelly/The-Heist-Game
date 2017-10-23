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

        // *************** MAP *************** //
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
        // *************** MAP *************** //




        // *************** PLAYER *************** //
        // Add robber character
        player = game.add.sprite(65, 1140, 'robber');
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
        // *************** PLAYER *************** //



        // *************** GUARDS *************** //
        // Add test security guards for detection testing
        // We should make this into a function in order to make
        // Multiple security guards easily
        guards = game.add.group();

        guard1 = game.add.sprite(800, 600, 'cop');
        guard1.frame = 0;
        game.physics.arcade.enable(guard1);
        guard1.animations.add('down', [1, 2, 3, 4], 10, true);
        guard1.animations.add('up', [14, 15, 16], 10, true);
        guard1.animations.play('down');
        guards.add(guard1);
        guard1.body.velocity.y = 75;

        guard2 = game.add.sprite(800, 1250, 'cop');
        guard2.frame = 0;
        game.physics.arcade.enable(guard2);
        guard2.animations.add('down', [1, 2, 3, 4], 10, true);
        guard2.animations.add('up', [14, 15, 16], 10, true);
        guard2.animations.play('down');
        guards.add(guard2);
        guard2.body.velocity.y = -75;

        guard3 = game.add.sprite(700, 1950, 'cop');
        guard3.frame = 0;
        game.physics.arcade.enable(guard3);
        guard3.animations.add('left', [5, 6, 7, 8], 10, true);
        guard3.animations.add('right', [9, 10, 11, 12], 10, true);
        guard3.animations.play('right');
        guards.add(guard3);
        guard3.body.velocity.x = 75;

        guard4 = game.add.sprite(550, 2410, 'cop');
        guard4.frame = 0;
        game.physics.arcade.enable(guard4);
        guard4.animations.add('left', [5, 6, 7, 8], 10, true);
        guard4.animations.add('right', [9, 10, 11, 12], 10, true);
        guard4.animations.play('right');
        guards.add(guard4);
        guard4.body.velocity.x = 75;

        guard5 = game.add.sprite(1460, 2544, 'cop');
        guard5.frame = 0;
        game.physics.arcade.enable(guard5);
        guard5.animations.add('down', [1, 2, 3, 4], 10, true);
        guard5.animations.add('up', [14, 15, 16], 10, true);
        guard5.animations.play('down');
        guards.add(guard5);
        guard5.body.velocity.y = 75;

        guard6 = game.add.sprite(1460, 1512, 'cop');
        guard6.frame = 0;
        game.physics.arcade.enable(guard6);
        guard6.animations.add('down', [1, 2, 3, 4], 10, true);
        guard6.animations.add('up', [14, 15, 16], 10, true);
        guard6.animations.play('down');
        guards.add(guard6);
        guard6.body.velocity.y = 75;

        guard7 = game.add.sprite(1970, 390, 'cop');
        guard7.frame = 0;
        game.physics.arcade.enable(guard7);
        guard7.animations.add('down', [1, 2, 3, 4], 10, true);
        guard7.animations.add('up', [14, 15, 16], 10, true);
        guard7.animations.play('down');
        guards.add(guard7);
        guard7.body.velocity.y = 75;

        guard8 = game.add.sprite(1755, 1873, 'cop');
        guard8.frame = 0;
        game.physics.arcade.enable(guard8);
        guard8.animations.add('left', [5, 6, 7, 8], 10, true);
        guard8.animations.add('right', [9, 10, 11, 12], 10, true);
        guard8.animations.play('right');
        guards.add(guard8);
        guard8.body.velocity.x = 75;

        guard9 = game.add.sprite(2280, 2550, 'cop');
        guard9.frame = 0;
        game.physics.arcade.enable(guard9);
        guard9.animations.add('down', [1, 2, 3, 4], 10, true);
        guard9.animations.add('up', [14, 15, 16], 10, true);
        guard9.animations.play('down');
        guards.add(guard9);
        guard9.body.velocity.y = 75;

        guard10 = game.add.sprite(2530, 2740, 'cop');
        guard10.frame = 0;
        game.physics.arcade.enable(guard10);
        guard10.animations.add('down', [1, 2, 3, 4], 10, true);
        guard10.animations.add('up', [14, 15, 16], 10, true);
        guard10.animations.play('down');
        guards.add(guard10);
        guard10.body.velocity.y = 75;

        guard11 = game.add.sprite(2610, 942, 'cop');
        guard11.frame = 0;
        game.physics.arcade.enable(guard11);
        guard11.animations.add('down', [1, 2, 3, 4], 10, true);
        guard11.animations.add('up', [14, 15, 16], 10, true);
        guard11.animations.play('down');
        guards.add(guard11);
        guard11.body.velocity.y = 75;

        guard12 = game.add.sprite(2500, 1550, 'cop');
        guard12.frame = 0;
        game.physics.arcade.enable(guard12);
        guard12.animations.add('left', [5, 6, 7, 8], 10, true);
        guard12.animations.add('right', [9, 10, 11, 12], 10, true);
        guard12.animations.play('right');
        guards.add(guard12);
        guard12.body.velocity.x = 75;

        guard13 = game.add.sprite(2500, 2220, 'cop');
        guard13.frame = 0;
        game.physics.arcade.enable(guard13);
        guard13.animations.add('left', [5, 6, 7, 8], 10, true);
        guard13.animations.add('right', [9, 10, 11, 12], 10, true);
        guard13.animations.play('right');
        guards.add(guard13);
        guard13.body.velocity.x = 75;
        // *************** GUARDS *************** //




        // *************** RAYCASTING *************** //
        bitmap = game.add.bitmapData(3200, 3200);
        bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
        game.add.image(0, 0, bitmap);
        // *************** RAYCASTING *************** //


        // Add cursor keys in order to move around the map
        cursors = game.input.keyboard.createCursorKeys();

        // add phaser physics arcade
        game.physics.startSystem(Phaser.Physics.ARCADE);

    },
    update: function() {
        // Update function

        // player collision
        game.physics.arcade.collide(player, WallsAccessories);

        // *************** RAY CASTING *************** //
        // Clear the bitmap where we are drawing our lines
        bitmap.context.clearRect(0, 0, 3200, 3200);

        // Ray casting!
        // Test if each camera can see the player by casting a ray (a line) towards the ball.
        // If the ray intersects any walls before it intersects the ball then the wall
        // is in the way.
        guards.forEach(function(guard) {
            // Define a line that connects the person to the ball
            // This isn't drawn on screen. This is just mathematical representation
            // of a line to make our calculations easier. Unless you want to do a lot
            // of math, make sure you choose an engine that has things like line intersection
            // tests built in, like Phaser does.
            var ray = new Phaser.Line(guard.x, guard.y, player.x + 16, player.y + 16);

            // Test if any walls intersect the ray
            var intersect = false;//this.getWallIntersection(ray);

            if (ray.length > 200) {//&& intersect) {
                // A wall is blocking this persons vision so change them back to their default color
                guard.tint = 0xffffff;
            } else {
                // This person can see the player so change their color
                guard.tint = 0x0000ff;

                // Draw a line from the ball to the person
                bitmap.context.beginPath();
                bitmap.context.moveTo(guard.x + 16, guard.y + 16);
                bitmap.context.lineTo(player.x, player.y);
                bitmap.context.stroke();
                // if (ray.length < 100) {
                //     // GAME OVER
                //     // Go to menu
                // }
            }
        }, this);

        // This just tells the engine it should update the texture cache
        bitmap.dirty = true;
        // *************** RAY CASTING *************** //




        // *************** GUARDS MOVEMENT *************** //
        // for testing loop the "securityGuard" in a path
        // guard 1  
        if (guard1.body.velocity.y < 0 && guard1.y < 600 ||
                guard1.body.velocity.y > 0 && guard1.y > 1050) {

            guard1.body.velocity.y *= -1; 
            guard1.body.velocity.y > 0 ? guard1.animations.play('down') : guard1.animations.play('up');
        }

        // guard 2
        if (guard2.body.velocity.y < 0 && guard2.y < 1250 ||
                guard2.body.velocity.y > 0 && guard2.y > 1650) {

            guard2.body.velocity.y *= -1; 
            guard2.body.velocity.y > 0 ? guard2.animations.play('down') : guard2.animations.play('up');
        }

        // guard 3
        if (guard3.body.velocity.x < 0 && guard3.x < 705 ||
                guard3.body.velocity.x > 0 && guard3.x > 1160) {

            guard3.body.velocity.x *= -1;
            guard3.body.velocity.x > 0 ? guard3.animations.play('right') : guard3.animations.play('left');
        }

        // guard 4
        if (guard4.body.velocity.x < 0 && guard4.x < 550 ||
                guard4.body.velocity.x > 0 && guard4.x > 1300) {

            guard4.body.velocity.x *= -1;
            guard4.body.velocity.x > 0 ? guard4.animations.play('right') : guard4.animations.play('left');
        }

        // guard 5
        if (guard5.body.velocity.y < 0 && guard5.y < 1669 ||
                guard5.body.velocity.y > 0 && guard5.y > 2455) {

            guard5.body.velocity.y *= -1; 
            guard5.body.velocity.y > 0 ? guard5.animations.play('down') : guard5.animations.play('up');
        }

        // guard 6
        if (guard6.body.velocity.y < 0 && guard6.y < 830 ||
                guard6.body.velocity.y > 0 && guard6.y > 1512) {

            guard6.body.velocity.y *= -1; 
            guard6.body.velocity.y > 0 ? guard6.animations.play('down') : guard6.animations.play('up');
        }

        // guard 7
        if (guard7.body.velocity.y < 0 && guard7.y < 406 ||
                guard7.body.velocity.y > 0 && guard7.y > 1215) {

            guard7.body.velocity.y *= -1; 
            guard7.body.velocity.y > 0 ? guard7.animations.play('down') : guard7.animations.play('up');
        }

        // guard 8
        if (guard8.body.velocity.x < 0 && guard8.x < 1755 ||
                guard8.body.velocity.x > 0 && guard8.x > 2272) {

            guard8.body.velocity.x *= -1;
            guard8.body.velocity.x > 0 ? guard8.animations.play('right') : guard8.animations.play('left');
        }

        // guard 9
        if (guard9.body.velocity.y < 0 && guard9.y < 2108 ||
                guard9.body.velocity.y > 0 && guard9.y > 2550) {

            guard9.body.velocity.y *= -1; 
            guard9.body.velocity.y > 0 ? guard9.animations.play('down') : guard9.animations.play('up');
        }

        // guard 10
        if (guard10.body.velocity.y < 0 && guard10.y < 2740 ||
                guard10.body.velocity.y > 0 && guard10.y > 3070) {

            guard10.body.velocity.y *= -1; 
            guard10.body.velocity.y > 0 ? guard10.animations.play('down') : guard10.animations.play('up');
        }

        // guard 11
        if (guard11.body.velocity.y < 0 && guard11.y < 116 ||
                guard11.body.velocity.y > 0 && guard11.y > 942) {

            guard11.body.velocity.y *= -1; 
            guard11.body.velocity.y > 0 ? guard11.animations.play('down') : guard11.animations.play('up');
        }

        // guard 12
        if (guard12.body.velocity.x < 0 && guard12.x < 2500 ||
                guard12.body.velocity.x > 0 && guard12.x > 2750) {

            guard12.body.velocity.x *= -1;
            guard12.body.velocity.x > 0 ? guard12.animations.play('right') : guard12.animations.play('left');
        }

        // guard 13
        if (guard13.body.velocity.x < 0 && guard13.x < 2500 ||
                guard13.body.velocity.x > 0 && guard13.x > 2750) {

            guard13.body.velocity.x *= -1;
            guard13.body.velocity.x > 0 ? guard13.animations.play('right') : guard13.animations.play('left');
        }

        // *************** GUARDS MOVEMENT *************** //





        // *************** PLAYER MOVEMENT *************** //
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
        // *************** PLAYER MOVEMENT *************** //
    }
}
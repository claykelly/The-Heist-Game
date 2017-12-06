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
        game.load.image('2dwalls', 'assets/2dwalls.png');
        game.load.image('extra', 'assets/extra.png');
        game.load.image('money', 'assets/money.png');
        game.load.image('OfficeFurniture', 'assets/OfficeFurniture.png');
        game.load.image('chair', 'assets/chair.png');
        game.load.image('tables', 'assets/tables.png');
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
        game.load.spritesheet('cop', 'assets/cop.png', 32, 48, 18);
        game.load.audio('level1Music', 'assets/sounds/recent_changes.ogg');
        game.load.audio('moneyCollectionSound', 'assets/sounds/laser1.wav');


    },
    create: function() {

        music = game.sound.play('level1Music');
        moneyCollectionSound = game.add.sound("moneyCollectionSound");

        // *************** MAP *************** //
        // Load the map
        map = game.add.tilemap('map1');

        // Here we must add in all the tilesets that we used in our map.
        // the tileset must be named according to what it is named in the tiled editor
        // (i.e. what you saved/named the tileset as)
        map.addTilesetImage('terrain-assets');
        map.addTilesetImage('accessories_tile');
        map.addTilesetImage('2dwalls');
        map.addTilesetImage('extra');
        map.addTilesetImage('OfficeFurniture');
        map.addTilesetImage('chair');
        map.addTilesetImage('tables');

        // the parameter is what the layer is ***called in tiled***
        Floor = map.createLayer('Floor');



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




        WallsAccessories = map.createLayer('WallsAccessories');
        WallsAccessories = map.createLayer('WallsAccessories2');
        Collision = map.createLayer('Collision');

        // collision with walls and accessories
        //map.setCollisionBetween(1, 2000, true, 'WallsAccessories');
        map.setCollisionBetween(1, 2000, true, 'Collision');
        Collision.alpha = 0;




        Floor.resizeWorld();
        // *************** MAP *************** //





        // *************** ITEMS *************** //
        moneyCount = 0;

        items = game.add.group();
        items.enableBody = true;
        
        // creates money from tiled map, the "1047" is the grid: property ID from the map1.JASON file
        // it selects all the object we placed down that are "cops" keep everything else
        // the same to add new objects except obviously the group
        map.createFromObjects('ObjectLayer', 1047, 'money', 0, true, false, items);

        // count how many dollars are on the map for the game over condition
        items.forEach( function(item) {
            moneyCount += 1;
        }, this);

        scoreText = game.add.text(400, 1120, 'Money Left: '+ moneyCount, { fontSize: '32px', fill: '#ffffff' });
        scoreText.fixedToCamera = true;
        scoreText.cameraOffset.setTo(0, 0);
        // *************** ITEMS *************** //




        // *************** GUARDS *************** //
        // Add test security guards for detection testing
        // We should make this into a function in order to make
        // Multiple security guards easily
        guards = game.add.group();
        guards.enableBody = true;

        map.createFromObjects('ObjectLayer', 1041, 'cop', 0, true, false, guards);

        // the guards are already placed by tiled we just need to set each guard's velocity
        this.createGuards(guards);
        // *************** GUARDS *************** //



        // *************** RAYCASTING *************** //
        bitmap = game.add.bitmapData(3200, 3200);
        bitmap.context.fillStyle = 'rgb(255, 255, 255)';
        bitmap.context.strokeStyle = 'rgb(255, 255, 255)';
        game.add.image(0, 0, bitmap);
        // *************** RAYCASTING *************** //


        // *************** SHADOW *************** //
        // Create the shadow texture
        this.shadowTexture = this.game.add.bitmapData(3200, 3200);

        // Create an object that will use the bitmap as a texture
        var lightSprite = this.game.add.image(0, 0, this.shadowTexture);

        // Set the blend mode to MULTIPLY. This will darken the colors of
        // everything below this sprite.
        lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
        // *************** SHADOW *************** //


        // Add cursor keys in order to move around the map
        cursors = game.input.keyboard.createCursorKeys();

        // add phaser physics arcade
        game.physics.startSystem(Phaser.Physics.ARCADE);

    },
    update: function() {
        // Update function

        // player collision
        //game.physics.arcade.collide(player, WallsAccessories);
        game.physics.arcade.collide(player, Collision);

        game.physics.arcade.overlap(player, items, this.collectMoney, null, this);


        // *************** RAY CASTING *************** //
        // Clear the bitmap where we are drawing our lines
        bitmap.context.clearRect(0, 0, 3200, 3200);

        // Draw shadow
        this.shadowTexture.context.fillStyle = 'rgb(175, 175, 175)';
        this.shadowTexture.context.fillRect(0, 0, 3200, 3200);

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
            var ray = new Phaser.Line(guard.x, guard.y, player.x, player.y);
            //game.physics.arcade.collide(ray, WallsAccessories);

            // Test if any walls intersect the ray
            var tileHits = Collision.getRayCastTiles(ray, 4, false, false);

            if (tileHits.length > 0 || ray.length > 300) {
                // A wall is blocking this guards vision or the player is too far
                if (guard.playerSeen) {

                    // Change guard back to not seein player so that we know to clear the
                    // guards vision circle
                    guard.playerSeen = false;

                    // Re-draw shadow to clear old guard vision
                    this.shadowTexture.context.fillStyle = 'rgb(175, 175, 175)';
                    this.shadowTexture.context.fillRect(0, 0, 3200, 3200);
                    this.shadowTexture.dirty = true;
                }


            } else {
                // This guard can see the player
                guard.playerSeen = true;

                // draw guards vision circle
                this.updateShadowTexture(guard);


                // Player is too close to the guard so they are "caught"
                if (ray.length < 150) {
                    // GAME OVER
                    // Go to menu
                    game.currentLevel = "level1";
                    music.stop();
                    this.game.cache.removeSound('level1Music');
                    this.game.state.start("gameOver");
                }          
            }

            // *************** GUARDS MOVEMENT *************** //
            this.moveGuard(guard);
            // *************** GUARDS MOVEMENT *************** //

        }, this);

        // This just tells the engine it should update the texture cache
        bitmap.dirty = true;
        // *************** RAY CASTING *************** //



        // *************** PLAYER MOVEMENT *************** //
        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        
        // Move up and right
        if (cursors.up.isDown && cursors.right.isDown) 
        {
            player.body.velocity.y = -250;
            player.body.velocity.x = 250;
            player.animations.play('up');
        }
        // Move up and left
        else if (cursors.up.isDown && cursors.left.isDown) 
        {
            player.body.velocity.y = -250;
            player.body.velocity.x = -250;
            player.animations.play('up');
        }
        // Move down and right
        else if (cursors.down.isDown && cursors.right.isDown) 
        {
            player.body.velocity.y = 250;
            player.body.velocity.x = 250;
            player.animations.play('down');
        }
        // Move down and left
        else if (cursors.down.isDown && cursors.left.isDown) 
        {
            player.body.velocity.y = 250;
            player.body.velocity.x = -250;
            player.animations.play('down');
        }
        // Move left
        else if (cursors.left.isDown)
        {
            player.body.velocity.x = -250;
            player.animations.play('left');
        }
        // Move right
        else if (cursors.right.isDown)
        {
            player.body.velocity.x = 250;
            player.animations.play('right');
        }
        // Move down
        else if (cursors.down.isDown) 
        {
            player.body.velocity.y = 250;
            player.animations.play('down');
        }
        // Move up
        else if (cursors.up.isDown) 
        {
            player.body.velocity.y = -250;
            player.animations.play('up');
        }
        // Standing still
        else {
            player.animations.stop();
            player.frame = 0;
        }
        // *************** PLAYER MOVEMENT *************** //
    },
    
    // *************** FUNCTIONS *************** //

    collectMoney: function(player, money) {
        // collect money in the game

        moneyCollectionSound.play();
        
        // Removes the money from the screen
        money.kill();

        //  Add and update the score
        moneyCount -= 1;
        scoreText.text = 'Money Left: ' + moneyCount;

        if (moneyCount === 0) {
            // ******************* Change this back to level 2 when it is working again!!! ******
            music.stop();
            this.game.cache.removeSound('level1Music');

            this.game.state.start("level3");
        }
    },
    createGuards: function(group) {

        guards.forEach( function(guard) {
            // set animations
            guard.animations.add('down', [1, 2, 3, 4], 10, true);
            guard.animations.add('up', [14, 15, 16], 10, true);
            guard.animations.add('left', [5, 6, 7, 8], 10, true);
            guard.animations.add('right', [9, 10, 11, 12], 10, true);

            guard.anchor.setTo(0.5, 0.5);

            // set guard velocity
            if (guard.verticalPatrol) {
                guard.body.velocity.y = guard.velocity;
                if (guard.velocity > 0) {
                    guard.animations.play('down');
                } else {
                    guard.animations.play('up');
                }
            } else {
                guard.body.velocity.x = guard.velocity;
                if (guard.velocity > 0) {
                    guard.animations.play('right');
                } else {
                    guard.animations.play('left');
                }
            }
        }, this);   
    },
    moveGuard: function(guard) {

        if (guard.verticalPatrol) {
            if (guard.body.velocity.y < 0 && guard.y < guard.topY ||
                    guard.body.velocity.y > 0 && guard.y > guard.bottomY) {

                guard.body.velocity.y *= -1; 
                guard.body.velocity.y > 0 ? guard.animations.play('down') : guard.animations.play('up');
            }
        } else {
            if (guard.body.velocity.x < 0 && guard.x < guard.leftX ||
                    guard.body.velocity.x > 0 && guard.x > guard.rightX) {

            guard.body.velocity.x *= -1;
            guard.body.velocity.x > 0 ? guard.animations.play('right') : guard.animations.play('left');
            }
        }
    },
    updateShadowTexture: function(guard) {
        // This function updates the shadow texture (this.shadowTexture).
        // First, it fills the entire texture with a dark shadow color.
        // Then it draws a white circle centered on the pointer position.
        // Because the texture is drawn to the screen using the MULTIPLY
        // blend mode, the dark areas of the texture make all of the colors
        // underneath it darker, while the white area is unaffected.

        // Draw circle of light
        this.shadowTexture.context.beginPath();
        this.shadowTexture.context.fillStyle = 'rgb(255, 255, 255)';
        this.shadowTexture.context.arc(guard.x, guard.y, 140, 0, Math.PI*2);
        this.shadowTexture.context.fill();

        // This just tells the engine it should update the texture cache
        this.shadowTexture.dirty = true;
    }
}
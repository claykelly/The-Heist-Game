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

    },

    create: function() {

        // Load the map
        var map = game.add.tilemap('map1');

        // Here we must add in all the tilesets that we used in our map.
        // the tileset must be named according to what it is named in the tiled editor
        // (i.e. what you saved/named the tileset as)
        map.addTilesetImage('terrain-assets');
        map.addTilesetImage('accessories_tile');

        // This resizes the tilemap in order to actually work in the browser
        // the parameter is what the layer is ***called in tiled***
        var Floor = map.createLayer('Floor');
        var WallsAccessories = map.createLayer('WallsAccessories');

        //map.setCollisionBetween(1, 2000, true, 'WallsAccessories');

        Floor.resizeWorld();

        // Add cursor keys in order to move around the map
        cursors = game.input.keyboard.createCursorKeys();

        // add phaser physics arcade
        //game.physics.startSystem(Phaser.Physics.ARCADE);

        // create a group of walls
        //walls = game.add.group();

        // enable physics for any object that is created in this group
        //walls.enableBody = true;

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
    update: function() {
        // Update function

        // Cursor keys movement to move the camera for now. This is jsut so we can
        // properly create the map
        if (cursors.left.isDown) {
            game.camera.x -= 8;
        }
        else if (cursors.right.isDown) {
            game.camera.x += 8;
        }

        if (cursors.up.isDown) {
            game.camera.y -= 8;
        }
        else if (cursors.down.isDown) {
            game.camera.y += 8;
        }
    }
}
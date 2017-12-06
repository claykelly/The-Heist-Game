// mainMenu.js

var mainMenu = {
    preload: function() {
        game.load.spritesheet('robber', 'assets/robber_two.png', 32, 48, 18);
        game.load.image("level1Picture", "assets/level1.png");
        game.load.image("level3Picture", "assets/level3.png");
        game.load.audio('UISelectionSound', 'assets/sounds/Menu_Selection_Click.wav');
    },
    create: function() {
        game.stage.backgroundColor = "#888888"

		//var playButton = this.game.add.button(window.innerWidth / 2,window.innerHeight / 2, "robber", this.playTheGame, this);
        //playButton.anchor.setTo(0.5,0.5);

        var level1Button = this.game.add.button(window.innerWidth / 2 - 100,window.innerHeight / 2 + 75, "level1Picture", this.playLevel1, this);
        level1Button.scale.setTo(0.07, 0.07);
        level1Button.anchor.setTo(0.5,0.5);

        var level1Label = this.game.add.text(window.innerWidth / 2 - 100,window.innerHeight / 2, "Level 1");
        level1Label.anchor.setTo(0.5,0.5);
        
        // Level 1 has been completed so you can now play level 2 if you wish
        if(game.isLevel1Completed){

            var level3Button = this.game.add.button(window.innerWidth / 2 + 100,window.innerHeight / 2 + 75, "level3Picture", this.playLevel3, this);
            level3Button.scale.setTo(0.07, 0.07);
            level3Button.anchor.setTo(0.5,0.5);

            var level3Label = this.game.add.text(window.innerWidth / 2 + 100,window.innerHeight / 2, "Level 2");
            level3Label.anchor.setTo(0.5,0.5);
        // Level 2 is not availiable yet because level 1 has not been completed
        } else {
            var level3Button = this.game.add.button(window.innerWidth / 2 + 100,window.innerHeight / 2 + 75, "level3Picture", this.level1NotCompleted, this);
            level3Button.scale.setTo(0.07, 0.07);
            level3Button.anchor.setTo(0.5,0.5);
            level3Button.tint = 00000000;

            var level3Label = this.game.add.text(window.innerWidth / 2 + 100,window.innerHeight / 2, "Level 2");
            level3Label.anchor.setTo(0.5,0.5);
        }

        var topMessage = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 150, "Collect all of the money in both levels to win.");
        topMessage.anchor.setTo(0.5,0.5);
        var topMessage2 = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 100, "Don't get too close to the guards!");
        topMessage2.anchor.setTo(0.5,0.5);

        var message = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 + 200, "Select a level to start");
        message.anchor.setTo(0.5,0.5);

        UISelectionSound = game.add.sound("UISelectionSound");
    },    
    playLevel1: function(){
        UISelectionSound.play();
        music.stop();
        this.game.cache.removeSound('menuMusic');
        this.game.state.start("level1");
    },
    playLevel3: function(){
        UISelectionSound.play();
        music.stop();
        this.game.cache.removeSound('menuMusic');
        this.game.state.start("level3");
    },
    level1NotCompleted: function(){
        UISelectionSound.play();
        var style = { fill: "#9e0e0e" };
        var level3NotAvaliable = this.game.add.text(window.innerWidth / 2,window.innerHeight / 2 - 50, "Level 2 is not unlocked yet! Complete level 1 to unlock it.", style);
        level3NotAvaliable.anchor.setTo(0.5,0.5);
        //level3NotAvaliable.addColor("#ff0000");
    }
}
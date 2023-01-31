class sceneManager{
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.roomWidth =tileSize * 20;
        this.roomHeight =tileSize * 10;

        this.player = new Player();
        this.player_two = new Player_Two();
        this.loadLevel(1);
    }
    loadLevel(level){
    
        this.level = levels[level];
        
        this.map = new map(this.level.mapSprite);
        gameEngine.addEntity(this.map);
        

        for(let i = 0; i < this.level.blocks.length; i++){
            gameEngine.addEntity(new block(this.level.blocks[i]))
        }
        gameEngine.addEntity(new Test_Block(80, 482, 400, 8));
        gameEngine.addEntity(new Test_Block(-10, 514, 8, 400));
        gameEngine.addEntity(new Test_Block(327.5, 514, 8, 400));
        gameEngine.addEntity(this.player);
        gameEngine.addEntity(this.player_two);
        this.game.addEntity(this)
    }
    update(){
        if(this.x < Math.floor((this.player.transform.pos.x + (8))/this.roomWidth)){
            this.x++;
        }
        else if(this.x > Math.floor((this.player.transform.pos.x + (8))/this.roomWidth)){
            this.x--;
        }

        if(this.y < Math.floor((this.player.transform.pos.y + (8))/this.roomHeight)){
            this.y++;
        }
        else if(this.y > Math.floor((this.player.transform.pos.y + (8))/this.roomHeight)){
            this.y--;
        }
    }
    draw(ctx){

    }
}
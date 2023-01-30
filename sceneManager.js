class sceneManager{
    constructor(game){
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;

        this.roomWidth =tileSize * 10;
        this.roomHeight =tileSize * 8;

        this.player = new Player(gameEngine);
        this.loadLevel(1);
    }
    loadLevel(level){
    
        this.level = levels[level];
        
        this.map = new map(this.level.mapSprite);
        gameEngine.addEntity(this.map);
        

        for(let i = 0; i < this.level.blocks.length; i++){
            gameEngine.addEntity(new block(this.level.blocks[i]))
        }
        gameEngine.addEntity(new Test_Block(80, 120, 80, 8));
        gameEngine.addEntity(this.player);
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
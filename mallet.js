class Mallet{
    constructor(game, facing, player_pos, player){
        this.tag = "mallet";
        Object.assign(this, {game, facing, player_pos});
        // Components
        let mallet_pos = Object.assign({},player_pos);

        this.owner = player;
        // Decide where the mallet will initially start
        switch(this.facing){
            case 0:
                this.transform = new Transform(new Vec2(mallet_pos.x-12, mallet_pos.y));
                break;
            case 1:
                this.transform = new Transform(new Vec2(mallet_pos.x+12, mallet_pos.y));
                break;
        }
        
        this.collider = new Collider(new AABB(this.transform.pos, 4, 4), true, true, false);

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player_mallet.png");

        this.direction = 0;
        // Animations
        this.animations = [];
        this.loadAnimations();

    }

     // Set up our animations variable
     loadAnimations(){
        for (let i = 0; i < 2; i++){ // 2 direction
            this.animations.push([]);
            for(let j = 0; j < 2; j++){ // up or down
                this.animations[i].push([]);
            }
        }

        // mallet slash animations

        // facing right, up
        this.animations[0][0] = new Animator(this.spritesheet, 0, 8, 8, 8, 1, 1, false);
        //facing right, down
        this.animations[0][1] = new Animator(this.spritesheet, 8, 8, 8, 8, 1, 1, false);

        // facing left, up
        this.animations[1][0] = new Animator(this.spritesheet, 0, 0, 8, 8, 1, 1, false);
        // facing left, down
        this.animations[1][1] = new Animator(this.spritesheet, 8, 0, 8, 8, 1, 1, false);

    }

    update(){
        switch(this.facing){
            case 0: // facing right
                if(this.owner.state == 2){
                    this.transform.pos.x = this.player_pos.x - 12;
                    this.transform.pos.y = this.player_pos.y;
                    this.direction = 0;
                } 
                else if(this.owner.state = 3){
                    this.transform.pos.x = this.player_pos.x -3;
                    this.transform.pos.y = this.player_pos.y - 12;
                    this.direction = 1;
                }
                break;

                case 1: // facing left
                if(this.owner.state == 2){
                    this.transform.pos.x = this.player_pos.x +12;
                    this.transform.pos.y = this.player_pos.y;
                    this.direction = 0;
                } 
                else if(this.owner.state = 3){
                    this.transform.pos.y = this.player_pos.y - 12;
                    this.transform.pos.x = this.player_pos.x + 3;
                    this.direction = 1;
                }
                break;
        }

        if(this.owner.grounded){
            this.removeFromWorld = true;
        }
      

    }

    draw(ctx){
        if(document.getElementById("debug").checked){
            draw_rect(ctx, this.transform.pos.x, this.transform.pos.y, 8, 8, false, true, 1);
        }
        this.animations[this.facing][this.direction].drawFrame(this.game.clockTick, ctx, this.transform.pos.x, this.transform.pos.y, 8, 8)
    }
}
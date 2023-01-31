class Player_Two{
    constructor(){
        // Game reference we pass in
        this.game = gameEngine;

        // Components
        this.tag = "player_two";
        this.transform = new Transform(new Vec2(64, 400), new Vec2(0,0), 1, new Vec2(0,0));
        this.health = new Health(3, 3);
        this.collider = new Collider(new AABB(this.transform.pos, 8, 8), true, true, false);
        this.knockback = new Knockback();
        this.invincible = new Invincible();
        this.gravity = new Gravity();

        // Reference to our spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/player_two_sheet.png");

        // Some state variables
        this.facing = 0; // 0 = right, 1 = left, 2 = up, 3 = down
        this.state = state_enum.idle;
        this.dead = false;

        // Some movement variables
        this.walk_speed = 40;

        // Jump variables
        this.distance_remaining;
        this.grounded = true;

        // State change variables
        this.jump_cooldown = 0.2;

        // Flag variables

        // Animations
        this.animations = [];
        this.loadAnimations();

        // Taking damage
        this.invulnerable = false;
        this.inverted = false;
        this.invulnerable_time = 0.15;
        this.switch_time = 0.1;
    }

    // Set up our animations variable
    loadAnimations(){
        for (let i = 0; i < 4; i++){ // 4 States, idle, walking,
            this.animations.push([]);
            for (let j = 0; j < 2; j++){ // 2
                this.animations[i].push([]);
            }
        }

        // idle animation, state 0

        // facing right
        this.animations[0][0] = new Animator(this.spritesheet, 0, 24, 16, 24, 1, 1, true);

        // facing left
        this.animations[0][1] = new Animator(this.spritesheet, 0, 0, 16, 24, 1, 1, true);


        //Moving animation, state 2

        //facing right
        this.animations[1][0] = new Animator(this.spritesheet, 0, 24, 16, 24, 4, 0.2, true);

        // facing left
        this.animations[1][1] = new Animator(this.spritesheet, 0, 0, 16, 24, 4, 0.2, true);


        // Jump animations, state 5

        // jumping upward
        //facing right
        this.animations[2][0] = new Animator(this.spritesheet, 16, 72, 16, 24, 1, 0.28, true);

        //facing left
        this.animations[2][1] = new Animator(this.spritesheet, 16, 48, 16, 24, 1, 0.28, true);

        // jumping upward
        //facing right
        this.animations[3][0] = new Animator(this.spritesheet, 32, 72, 16, 24, 1, 0.28, true);

        //facing left
        this.animations[3][1] = new Animator(this.spritesheet, 32, 48, 16, 24, 1, 0.28, true);
    }

    update(){
        if(this.invincible.active){
            invulnerability_active(this);
        }
        if(this.state == state_enum.jumping && this.gravity.velocity >= 0){
            this.state = 3;
        }
        this.check_input();
        this.check_animation_end();
        this.movement();
    }

    draw(ctx){
        if(document.getElementById("debug").checked){
            draw_rect(ctx, this.transform.pos.x, this.transform.pos.y, 16, 16, false, true, 1);
        }
        this.animations[this.state][this.facing].drawFrame(this.game.clockTick, ctx, this.transform.pos.x, this.transform.pos.y, 16, 16, this.invincible.inverted);
    }

    jump(){
        this.state = state_enum.jumping;
        let mallet = new Mallet(this.game, this.facing, this.transform.pos, this);
        this.game.addEntity(mallet);
        this.gravity.velocity = -1.5;
        this.grounded = false;
    }


    // ----------- This section is dedicated to checking for specific key presses in order to change states ---- //
    // -----------  we do not actually change states here, just set booleans. I.e. "attacking" ------------------ //
    check_input(){
        //Jump check
        if(this.game.keys["ArrowUp"] && this.jump_cooldown >= 0 && this.grounded){ //Pressing space
            this.jump();
            this.distance_remaining = this.jump_distance;
            this.jump_cooldown -= gameEngine.clockTick;
        }
        else{
            this.jump_cooldown = 0.2;
        }
    }

    // ----------- This section is dedicated for seeing if we have finished an animation ---- //
    // ----------- i.e., to check if we have finished sword slashing or jumping ------------- //
    check_animation_end(){
        if(this.state == state_enum.jumping || this.state == 3){
            if(this.grounded){
                for(let i = 0; i < 2; i++){
                    this.animations[state_enum.jumping][i].elapsedTime = 0;
                    this.animations[state_enum.jumping][i].done = false;
                    this.animations[3][i].elapsedTime = 0;
                    this.animations[3][i].done = false;
                }
                this.state = state_enum.idle;
            }
            
        }

    }

    movement(){
        if(this.state != state_enum.jumping && this.state != 3){
            this.transform.velocity.x = 0;
        }
        
        this.transform.velocity.y = 0;

        if(!this.knockback.active && this.state != state_enum.jumping && this.state != 3){
            this.transform.velocity.x = ((-(this.game.keys["ArrowLeft"] ? 1: 0) + (this.game.keys["ArrowRight"] ? 1: 0)) * this.walk_speed *this.game.clockTick);
        }
        else if (this.knockback.active){
            knockback(this);
        }
        

        // Figure out the direction for animation
        if(this.transform.velocity.x > 0){ // Facing right
            this.facing = 0;
        }
        else if (this.transform.velocity.x < 0){ // Facing left
            this.facing = 1;
        }

        if(this.state != state_enum.jumping && this.state != 3){
            if (this.transform.velocity.x == 0 && this.transform.velocity.y == 0){
                this.state = state_enum.idle; // idle state
            }
            else{ // moving
                this.state = state_enum.walking; // moving state
            }
        }

        // Adjust where our actual game object is located in the world. -- //

        this.transform.velocity.y += this.gravity.velocity;
        // Adjust position from velocity
        this.transform.prev_pos.x = this.transform.pos.x;
        this.transform.prev_pos.y = this.transform.pos.y
        this.transform.pos.x += this.transform.velocity.x;
        this.transform.pos.y += this.transform.velocity.y; 
        
    }
}

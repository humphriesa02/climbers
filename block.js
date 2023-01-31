class block{
    constructor(position){
        this.position = position;
        this.tag = "block";
        this.transform = new Transform(new Vec2(this.position[0] * 16 + 8, this.position[1] * 16 + 8));
        this.transform.prev_pos = this.transform.pos;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/block.png");
        this.animator = new Animator(this.spritesheet, 0, 0, 16, 6, 1, 1, true);
        this.collider = new Collider(new AABB(this.transform.pos, 8, 3), true, true, false);
    }
    update(){

    }
    draw(ctx){
        this.animator.drawFrame(gameEngine.clockTick,ctx,this.transform.pos.x, this.transform.pos.y,16, 6);
    }
}

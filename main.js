const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.queueDownload("./sprites/player_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/player_two_sheet.png");
ASSET_MANAGER.queueDownload("./sprites/player_mallet.png");
ASSET_MANAGER.queueDownload("./sprites/map.png");
ASSET_MANAGER.queueDownload("./sprites/explosion.png");
ASSET_MANAGER.queueDownload("./sprites/block.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	params.scale = document.getElementById("scale").value;
	const setScale = document.getElementById("reset");

	gameEngine.init(ctx);

	new sceneManager(gameEngine);

	gameEngine.start();

	setScale.addEventListener('click', function(e) {
		params.scale = document.getElementById("scale").value;
		clearEntities();
		ctx.canvas.width =  20 * tileSize * params.scale;
		ctx.canvas.height = 10 * tileSize * params.scale;
		ctx.imageSmoothingEnabled = false;
	});
});

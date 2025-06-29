export function inject() {
	// Hook the PixiJS Assets package
	// https://pixijs.download/v7.2.4/docs/PIXI.Assets.html
	const ObjectDefineProperty = Object.defineProperty;
	Object.defineProperty = function (...args) {
		if (args[0]?.loadTextures) {
			window.PixiAssets = args[0].Assets;
			Object.defineProperty = ObjectDefineProperty;
		}
		return ObjectDefineProperty.apply(this, args);
	};

	// Hook the gameScene
	const originalBind = Function.prototype.bind;
	Function.prototype.bind = function (...args) {
		if (args[0]?.gameScene) {
			window.game = args[0];
		}
		return originalBind.apply(this, args);
	};

}
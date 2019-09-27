"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var PIXI = __importStar(require("pixi.js"));
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.onResize = function () {
            _this.game.renderer.resize(window.innerWidth, window.innerHeight);
            // Move container to the center
            _this.container.x = window.innerWidth / 2;
            _this.container.y = window.innerHeight / 2;
        };
        this.KeyDown = function (key) {
            switch (key.code) {
                case 'ArrowUp':
                    if (_this.container.y > 0) {
                        _this.container.y = _this.container.y - 10;
                    }
                    break;
                case 'ArrowDown':
                    if (window.innerHeight - 110 > _this.container.y) {
                        _this.container.y = _this.container.y + 10;
                    }
                    break;
                case 'ArrowRight':
                    if (window.innerWidth - 110 > _this.container.x) {
                        _this.container.x = _this.container.x + 10;
                    }
                    break;
                case 'ArrowLeft':
                    if (_this.container.x > 0) {
                        _this.container.x = _this.container.x - 10;
                    }
                    break;
                case 'Space':
                    console.log('Attack!!!');
                    break;
                default:
                    console.log(key);
                    break;
            }
            var _a = _this.container, x = _a.x, y = _a.y;
            console.log(x, y);
            console.log(window.innerWidth, window.innerHeight);
        };
        this.RotateMyBunny = function () {
            _this.game.ticker.add(function (delta) {
                // rotate the container!
                // use delta to create frame-independent transform
                _this.container.rotation -= 0.02 * delta;
            });
        };
        window.onload = function () {
            _this.createrenderer();
        };
    }
    App.prototype.createrenderer = function () {
        var div = document.getElementById("container");
        this.game = new PIXI.Application({
            backgroundColor: 0x222222,
            height: window.innerHeight,
            width: window.innerWidth
        });
        this.container = new PIXI.Container();
        this.game.stage.addChild(this.container);
        var texture = PIXI.Texture.from('assets/bunny.png');
        var bunny = new PIXI.Sprite(texture);
        bunny.width = 100;
        bunny.height = 100;
        this.container.addChild(bunny);
        // Move container to the center
        this.container.x = this.game.screen.width / 2;
        this.container.y = this.game.screen.height / 2;
        //this.RotateMyBunny()
        window.onresize = this.onResize;
        window.onkeydown = this.KeyDown;
        div.appendChild(this.game.view);
    };
    return App;
}());
exports.App = App;
(function () {
    var game = new App();
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0Q0FBZ0M7QUFFaEM7SUFLSTtRQUFBLGlCQU1DO1FBZ0NPLGFBQVEsR0FBRztZQUNmLEtBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqRSwrQkFBK0I7WUFDL0IsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDekMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFFOUMsQ0FBQyxDQUFBO1FBRU8sWUFBTyxHQUFHLFVBQUMsR0FBTztZQUN0QixRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2QsS0FBSyxTQUFTO29CQUNWLElBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFDO3dCQUNwQixLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRSxFQUFFLENBQUE7cUJBQzFDO29CQUNELE1BQU07Z0JBQ1YsS0FBSyxXQUFXO29CQUNaLElBQUcsTUFBTSxDQUFDLFdBQVcsR0FBRSxHQUFHLEdBQUUsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUM7d0JBQ3pDLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFFLEVBQUUsQ0FBQTtxQkFDMUM7b0JBQ0QsTUFBTTtnQkFDVixLQUFLLFlBQVk7b0JBQ2IsSUFBRyxNQUFNLENBQUMsVUFBVSxHQUFFLEdBQUcsR0FBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQzt3QkFDeEMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUUsRUFBRSxDQUFBO3FCQUMxQztvQkFDRCxNQUFNO2dCQUNWLEtBQUssV0FBVztvQkFDWixJQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQzt3QkFDcEIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUUsRUFBRSxDQUFBO3FCQUMxQztvQkFDRCxNQUFNO2dCQUNWLEtBQUssT0FBTztvQkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFBO29CQUN4QixNQUFNO2dCQUNWO29CQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7b0JBQ2hCLE1BQU07YUFDYjtZQUNLLElBQUEsb0JBQXNCLEVBQXJCLFFBQUMsRUFBQyxRQUFtQixDQUFBO1lBQzVCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkQsQ0FBQyxDQUFBO1FBRU8sa0JBQWEsR0FBRztZQUNwQixLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBQyxLQUFLO2dCQUN2Qix3QkFBd0I7Z0JBQ3hCLGtEQUFrRDtnQkFDbEQsS0FBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQztZQUM1QyxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQXBGRyxNQUFNLENBQUMsTUFBTSxHQUFHO1lBRVosS0FBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQzFCLENBQUMsQ0FBQztJQUNOLENBQUM7SUFFTyw0QkFBYyxHQUF0QjtRQUVJLElBQUksR0FBRyxHQUFlLFFBQVEsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDM0QsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQ2hDO1lBQ0ksZUFBZSxFQUFFLFFBQVE7WUFDekIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxXQUFXO1lBQzFCLEtBQUssRUFBRSxNQUFNLENBQUMsVUFBVTtTQUMzQixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDekMsSUFBSSxPQUFPLEdBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUV4RCxJQUFNLEtBQUssR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDdkMsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7UUFDakIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFL0IsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUUvQyxzQkFBc0I7UUFFdEIsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1FBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxHQUFHLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQW1ETCxVQUFDO0FBQUQsQ0FBQyxBQTVGRCxJQTRGQztBQTVGWSxrQkFBRztBQThGaEIsQ0FBQztJQUNHLElBQU0sSUFBSSxHQUFRLElBQUksR0FBRyxFQUFFLENBQUM7QUFDaEMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyJ9
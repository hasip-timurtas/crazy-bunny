import * as PIXI from "pixi.js";

export class App 
{
    private game:PIXI.Application;
    private container:PIXI.Container;
    private bunny:PIXI.Sprite;

    constructor() 
    {
        window.onload = () => 
        {
            this.createrenderer();
        };
    }

    private createrenderer(): void 
    {
        var div:HTMLElement = document.getElementById("container");
        this.game = new PIXI.Application(
        {
            backgroundColor: 0x222222,
            height: window.innerHeight,
            width: window.innerWidth
        });

        this.container = new PIXI.Container();
        this.game.stage.addChild(this.container);
        var textureBunny:any = PIXI.Texture.from('assets/bunny.png');

        this.bunny = new PIXI.Sprite(textureBunny);
        this.bunny.width = 100
        this.bunny.height = 100
        this.container.addChild(this.bunny);

        /*
        // Move container to the center
        this.container.x = this.game.screen.width / 2;
        this.container.y = this.game.screen.height -    100;
*/
        //this.RotateMyBunny()

        window.onresize = this.onResize;
        window.onkeydown = this.KeyDown;
        div.appendChild(this.game.view);
    }

    private onResize = () => {   
        this.game.renderer.resize(window.innerWidth, window.innerHeight);
        // Move container to the center
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight / 2;
        
    }

    private KeyDown = (key:any) => {
        switch (key.code) {
            case 'ArrowUp':
                if(this.bunny.y > 0){
                    this.bunny.y = this.bunny.y -10
                }
                break;
            case 'ArrowDown':
                if(window.innerHeight -110> this.bunny.y){
                    this.bunny.y = this.bunny.y +10
                }
                break;
            case 'ArrowRight':
                if(window.innerWidth -110> this.bunny.x){
                    this.bunny.x = this.bunny.x +10
                }
                break;
            case 'ArrowLeft':
                if(this.bunny.x > 0){
                    this.bunny.x = this.bunny.x -10
                }
                break;
            case 'Space':
                this.BunnyAttack()
                console.log('Attack!!!')
                break;
            default:
                console.log(key)
                break;
        }
        const {x,y} = this.container
        console.log(x,y)
        console.log(window.innerWidth, window.innerHeight);
    }

    private BunnyAttack = () =>{
        var textureFirBall:any = PIXI.Texture.from('assets/fireball.png')
        const fireBall = new PIXI.Sprite(textureFirBall)
        fireBall.x = this.bunny.x + 25
        fireBall.y = this.bunny.y +50
        this.container.addChild(fireBall);

        setInterval(()=>{
            
                fireBall.y = fireBall.y -10
                
        }, 100)
    }

    private RotateMyBunny = () =>{
        this.game.ticker.add((delta) => {
            // rotate the container!
            // use delta to create frame-independent transform
            this.container.rotation -= 0.02 * delta;
        });
    }
}

(function() {
    const game: App = new App();
})();

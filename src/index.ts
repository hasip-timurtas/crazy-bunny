import * as PIXI from "pixi.js";

export class App 
{
    private game:PIXI.Application;
    private container:PIXI.Container;
    private bunny:PIXI.Sprite;
    private headText:PIXI.Text;
    private descriptionText:PIXI.Text;
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

        this.headText = new PIXI.Text('Start Playing The Game ', {
            font: "bold 64px Roboto", // Set  style, size and font
            fill: '#3498db', // Set fill color to blue
            align: 'center', // Center align the text, since it's multiline
            stroke: '#34495e', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        });

        this.descriptionText = new PIXI.Text('Space attacks, arrows moves! ', {
            font: "bold 64px Roboto", // Set  style, size and font
            align: 'center', // Center align the text, since it's multiline
            stroke: '#3498db', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        })

        


        this.container.addChild(this.headText)
        this.container.addChild(this.descriptionText)

       
        var textureBunny:any = PIXI.Texture.from('assets/bunny.png');

        this.bunny = new PIXI.Sprite(textureBunny);
        this.bunny.width = 100
        this.bunny.height = 100
        this.container.addChild(this.bunny);

        
        // Move container to the center
        this.LocateObjects()

        window.onresize = this.onResize;
        window.onkeydown = this.KeyDown;
        div.appendChild(this.game.view);
    }

    private onResize = () => {   
        this.game.renderer.resize(window.innerWidth, window.innerHeight);
        // Move container to the center
        this.LocateObjects()
        
    }

    private LocateObjects(){
        this.bunny.x = window.innerWidth / 2 - 50;
        this.bunny.y = window.innerHeight - 100;

        this.headText.x = window.innerWidth / 3;
        this.headText.y = window.innerHeight / 2.3;
        
        this.descriptionText.x =  window.innerWidth/ 3;
        this.descriptionText.y = window.innerHeight / 2;
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
        console.log(key)
    }

    private BunnyAttack = () =>{
        var textureFirBall:any = PIXI.Texture.from('assets/fireball.png')
        const fireBall = new PIXI.Sprite(textureFirBall)
        fireBall.x = this.bunny.x + 25
        fireBall.y = this.bunny.y +50
        this.container.addChild(fireBall);

        var timer = setInterval(()=>{
            fireBall.y = fireBall.y -20 
            if(fireBall.y <= -50) { // if fireball exits from screen then delete it for performance.
                clearInterval(timer) // delete timer
                this.container.removeChild(fireBall) // delete fireball
            }
        }, 100)
    }
}

(function() {
    const game: App = new App();
})();

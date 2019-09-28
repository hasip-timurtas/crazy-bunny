import * as PIXI from "pixi.js";

export class App 
{
    private game:PIXI.Application;
    private container:PIXI.Container;
    private bunny:PIXI.Sprite;
    private headText:PIXI.Text;
    private descriptionText:PIXI.Text;
    private started:boolean;
    private boxes:Array<PIXI.Sprite>;
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

        this.AddDescriptions() // Descriptions

        this.AddBunny() // Our bunny :) 

        // Move container to the center
        this.LocateObjects()

        window.onresize = this.onResize;
        window.onkeydown = this.KeyDown;
        window.onclick = this.windowClick;
        div.appendChild(this.game.view);
    }

    private AddDescriptions = () => {
        this.headText = new PIXI.Text('Angry Bunny  🙃', {
            font: "bold 64px Roboto", // Set  style, size and font
            fill: '#3498db', // Set fill color to blue
            align: 'center', // Center align the text, since it's multiline
            stroke: '#34495e', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        });

        this.descriptionText = new PIXI.Text('Space and click attacks, arrows moves! \n Press any button for start.', {
            font: "bold 64px Roboto", // Set  style, size and font
            align: 'center', // Center align the text, since it's multiline
            stroke: '#3498db', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        })

        
        this.container.addChild(this.headText)
        this.container.addChild(this.descriptionText)
    }

    private AddBunny = () =>{
        var textureBunny:any = PIXI.Texture.from('assets/bunny.png');
        //var textureBunny:any = PIXI.Texture.from('assets/choco/choco_walk.png');
        //base.setSize(64, 64) // Original image size
        var rect = new PIXI.Rectangle(0,0, 64,64)
        //textureBunny.frame  = rect

        this.bunny = new PIXI.Sprite(textureBunny);
        this.bunny.width = 100
        this.bunny.height = 100
        this.container.addChild(this.bunny);
    }

    private onResize = () => {
        /*
        when resize the screen then all the objects will resize again: Bunny, texts and boxes
        */
        this.game.renderer.resize(window.innerWidth, window.innerHeight);
        this.LocateObjects()
    }

    private LocateObjects(){
        this.bunny.x = window.innerWidth / 2 - 50;
        this.bunny.y = window.innerHeight - 100;

        if(!this.started){
            //this.headText.style.fontSize = window.innerWidth / 30
            this.headText.x = window.innerWidth / 2.3;
            this.headText.y = window.innerHeight / 2.3;

            //this.descriptionText.style.fontSize = window.innerWidth / 30
            this.descriptionText.x =  window.innerWidth/ 2.7;
            this.descriptionText.y = window.innerHeight / 2;
        }
        
        if(this.started){
            this.boxes.forEach(e=> this.container.removeChild(e)) // remove boxes
            this.StartEnemies()
        }
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
        this.RemoveDesctiptionsAndStart()
    }

    private windowClick = () => {
        this.BunnyAttack()
        console.log('Attack!!!')
    }

    private BunnyAttack = () =>{
        var textureFirBall:any = PIXI.Texture.from('assets/fireball.png')
        const fireBall = new PIXI.Sprite(textureFirBall)
        fireBall.x = this.bunny.x + 25
        fireBall.y = this.bunny.y +50
        this.container.addChild(fireBall);

        var timer = setInterval(()=>{
            fireBall.y = fireBall.y -20

            for (let i = 0; i < this.boxes.length; i++) {
                const box =  this.boxes[i];
                var inYarea = fireBall.y > box.y && fireBall.y < box.y + 54
                var inXarea = fireBall.x + 35 > box.x && fireBall.x < box.x + 54
                console.log("fireballx ve box x: ", fireBall.x , box.x )
                if(inYarea && inXarea){
                     
                    this.container.removeChild(fireBall)
                    this.container.removeChild(box)
                    clearInterval(timer)
                    this.boxes = this.boxes.filter(e=> e != box)
                    if(this.boxes.length == 0) this.GameOver()
                }
            }
            
            if(fireBall.y <= -50) { // if fireball exits from screen then delete it for performance.
                clearInterval(timer) // delete timer
                this.container.removeChild(fireBall) // delete fireball
            }

            console.log(timer)
        }, 100)
    }

    private RemoveDesctiptionsAndStart =  () => {
        if(!this.started){
            this.container.removeChild(this.headText)
            this.container.removeChild(this.descriptionText)
            this.started = true
            this.StartEnemies()
        }
    }

    private StartEnemies = () => {
        var textureBox:any = PIXI.Texture.from('assets/box64x64.png')
        this.boxes = new Array<PIXI.Sprite>();
        for (let i = 0; i < 5; i++) {
            var box = new PIXI.Sprite(textureBox)
            var randomX = Math.floor(Math.random() * (window.innerWidth - 100))
            var randomY = Math.floor(Math.random() * (window.innerHeight - 200))
            console.log(window.innerWidth, window.innerHeight,  randomX, randomY);
            
            box.x = randomX
            box.y = randomY
            this.boxes.push(box)
            this.container.addChild(box)
            console.log(box)
        }
        
        // x sıfırdan büyük  window.innerWidth-64 den küçük
        // y sıfırdan büyük window.innerHeight-64 den küçük
    }

    private GameOver = () =>{
        this.started = false
        this.AddDescriptions()
        this.LocateObjects()
    }

}

(function() {
    const game: App = new App();
})();

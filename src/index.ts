import * as PIXI from "pixi.js";

export class App 
{
    private game:PIXI.Application;
    private container:PIXI.Container;
    private bunny:PIXI.Sprite;
    private headText:PIXI.Text;
    private started:boolean;
    private boxes:Array<PIXI.Sprite>;
    private headerContainer:HTMLElement; 

    constructor() 
    {
        window.onload = () => 
        {
            this.CreateRenderer();
            setInterval(()=>this.updateFPS(), 1000)
            ;
        };
    }

    private CreateRenderer(): void 
    {
        var div:HTMLElement = document.getElementById("container");
        this.headerContainer = document.getElementById("header");
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
        this.headText = new PIXI.Text('Crazy Bunny  🙃 \n Space and click attacks, \n arrows moves! \n PRESS HERE TO START.', {
            font: "bold 64px Roboto", // Set  style, size and font
            fill: '#3498db', // Set fill color to blue
            align: 'center', // Center align the text, since it's multiline
            stroke: '#34495e', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        });


        this.headText.interactive = true
        this.headText.on('click', ()=>{
            this.RemoveDesctiptionsAndStart()
        })
        
        this.container.addChild(this.headText)
    }

    private AddBunny = () =>{
        var textureBunny:any = PIXI.Texture.from('assets/bunny.png');
        var textureLeftArrow:any = PIXI.Texture.from('assets/left.png')
        var textureRightArrow:any = PIXI.Texture.from('assets/right.png')

        this.bunny = new PIXI.Sprite(textureBunny);
        this.bunny.width = 100
        this.bunny.height = 100

        var leftArrow = new PIXI.Sprite(textureLeftArrow);
        leftArrow.x = this.bunny.x - 20
        leftArrow.y = this.bunny.y
        leftArrow.anchor.set(0.5)
        leftArrow.interactive = true
        leftArrow.on('click', () =>{
            if(this.bunny.x > 50){
                this.bunny.x = this.bunny.x -10
            }
        })

        var rightArrow = new PIXI.Sprite(textureRightArrow);
        rightArrow.x = this.bunny.x + 20
        rightArrow.y = this.bunny.y
        rightArrow.anchor.set(0.5)
        rightArrow.interactive = true
        rightArrow.on('click', () =>{
            if(window.innerWidth -70> this.bunny.x){
                this.bunny.x = this.bunny.x +10
            }
        })

        this.bunny.anchor.set(0.5)
        this.bunny.addChild(leftArrow)
        this.bunny.addChild(rightArrow)
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
            this.headText.anchor.set(0.5)
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
                if(window.innerWidth -70> this.bunny.x){
                    this.bunny.x = this.bunny.x +10
                }
                break;
            case 'ArrowLeft':
                if(this.bunny.x > 50){
                    this.bunny.x = this.bunny.x -10
                }
                break;
            case 'Space':
                this.Attack()
                break;
            default:
                console.log(key)
                break;
        }
    }

    private windowClick = () => {
        this.Attack()
    }

    private Attack = ()=>{
        if(this.started){
            this.PrepareAttack()
            console.log('Attack!!!')
        }
    }

    private PrepareAttack = () =>{
        var textureFirBall:any = PIXI.Texture.from('assets/fireball.png')
        const fireBall = new PIXI.Sprite(textureFirBall)
        fireBall.x = this.bunny.x - 20
        fireBall.y = this.bunny.y - 5

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

    private updateFPS():void
    {
        var fps:string = this.game.ticker.FPS.toFixed(2);

        this.headerContainer.innerHTML = "FPS: " + fps 
    }

}

(function() {
    const game: App = new App();
})();

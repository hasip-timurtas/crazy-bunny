import * as PIXI from "pixi.js";

export class App 
{
    private game:PIXI.Application;
    private mainContainer:PIXI.Container; // main container
    private bunnyContainer:PIXI.Container // bunny container -> it has arrows and bunny inside
    private bunny:PIXI.Sprite;  // our bunny 😊
    private headText:PIXI.Text; // welcome text also guide
    private started:boolean; // checking if game is started. 
    private boxes:Array<PIXI.Sprite>; // the enemy! our bunny will attack with fire and kill them all.. 
    private boxAmount:number = 5 // amount of box(enemy) we want to create.
    private dragging:boolean;
    private data:any;
    constructor() 
    {
        window.onload = () => 
        {
            this.CreateRenderer();
            this.WriteFps();
        };
    }

    private CreateRenderer(): void 
    {   
        // our containet hmtl element
        var div:HTMLElement = document.getElementById("container");
        
        // create our game app
        this.game = new PIXI.Application({
            backgroundColor: 0x222222,
            height: window.innerHeight,
            width: window.innerWidth,
        });

        this.mainContainer = new PIXI.Container();
        this.game.stage.addChild(this.mainContainer);

        this.AddHeadText() // Welcome or head text.
        this.CreateBunny() // Add our hero
        // Move container to the center
        this.LocateObjects()
        window.onresize = this.onResize;
        window.onkeydown = this.KeyDown;
        div.appendChild(this.game.view);
        (<any>window).bunny = this.bunny // test
    }

    private AddHeadText = () => {
        //Here we add our text first, The game will start when click to text.
        this.headText = new PIXI.Text('Crazy Bunny  🙃 \n Space and click attacks, \n arrows moves! \n you can drag and drop! \n PRESS HERE TO START.', {
            font: "bold 64px Roboto", // Set  style, size and font
            fill: '#3498db', // Set fill color to blue
            align: 'center', // Center align the text, since it's multiline
            stroke: '#34495e', // Set stroke color to a dark blue gray color
            strokeThickness: 20, // Set stroke thickness to 20
            lineJoin: 'round' // Set the lineJoin to round
        });


        this.headText.interactive = true // for using pointertap event.

        // here we use pointertap because click didnt work on mobile.
        this.headText.on('pointertap', ()=>{
            this.RemoveDesctiptionsAndStart() // when clicks the text Starts the game here.
        })
        
        this.mainContainer.addChild(this.headText)
    }

    private CreateBunny = () =>{
        this.bunnyContainer = new PIXI.Container(); // crate our bunny container which will have bunny and it's arrow inside. also fireballs later.
        this.bunnyContainer.interactive = true // for events
        // BunnyContainer Drag Drop setup events
        this.bunnyContainer
        // events for drag start
        .on('mousedown', this.onDragStart)
        .on('touchstart', this.onDragStart)
        // events for drag end
        .on('mouseup', this.onDragEnd)
        .on('mouseupoutside', this.onDragEnd)
        .on('touchend', this.onDragEnd)
        .on('touchendoutside', this.onDragEnd)
        // events for drag move
        .on('mousemove', this.onDragMove)
        .on('touchmove', this.onDragMove)


        // Get assets
        var textureBunny:any = PIXI.Texture.from('assets/bunny.png');
        var textureLeftArrow:any = PIXI.Texture.from('assets/left.png')
        var textureRightArrow:any = PIXI.Texture.from('assets/right.png')

        // create bunny
        this.bunny = new PIXI.Sprite(textureBunny);
        this.bunny.width = 100
        this.bunny.height = 100
        this.bunny.anchor.set(0.5)
        this.bunny.interactive = true
        this.bunnyContainer.x = window.innerWidth / 2 - 50; // for dynamic result
        this.bunnyContainer.y = window.innerHeight - 100;

        // this button mode will mean the hand cursor appears when you roll over the bunny with your mouse
        this.bunny.buttonMode = true;

        // it throws fireballs when ckick bunny 
        this.bunny.on('pointertap', () =>{
            this.Attack()
        })

        // add bunny to bunny container
        this.bunnyContainer.addChild(this.bunny);

        // create left arrow
        var leftArrow = new PIXI.Sprite(textureLeftArrow);
        leftArrow.x = this.bunny.x - 75
        leftArrow.y = this.bunny.y
        leftArrow.anchor.set(0.5)
        leftArrow.interactive = true
        // Set left arrow click event
        leftArrow.on('pointertap', () =>{
            this.MoveBunnyLeft()
        })

        // create right arrow
        var rightArrow = new PIXI.Sprite(textureRightArrow);
        rightArrow.x = this.bunny.x + 75
        rightArrow.y = this.bunny.y
        rightArrow.anchor.set(0.5)
        rightArrow.interactive = true
        // Set right arrow click event
        rightArrow.on('pointertap', () =>{
            this.MoveBunnyRight()
        })
         

        // add arrows to bunny container and bunny container to main container
        this.bunnyContainer.addChild(leftArrow)
        this.bunnyContainer.addChild(rightArrow)
        this.mainContainer.addChild(this.bunnyContainer)

       
        
    }

    private onDragStart = (event:any) =>{
        // store a reference to the data
        // the reason for this is because of multitouch
        // we want to track the movement of this particular touch
        this.data = event.data;
        this.dragging = true;
    }

    private onDragEnd = () =>{
        this.dragging = false;
        // set the interaction data to null
        this.data = null;
    }

    private onDragMove = () =>
    {
        if (this.dragging)
        {
            var newPosition = this.data.getLocalPosition(this.bunnyContainer.parent);
            this.bunnyContainer.x = newPosition.x;
            this.bunnyContainer.y = newPosition.y;
        }
    }


    private onResize = () => {
        // when resize the screen then all the objects will resize again: Bunny, texts and boxes
        this.LocateObjects()
    }

    private LocateObjects(){
        // when resize the screen then all the objects will resize again: Bunny, texts and boxes
        this.game.renderer.resize(window.innerWidth, window.innerHeight);

        if(!this.started){
            // if not started and move the screen then the text will relocate.
            this.headText.x = window.innerWidth / 2.3;
            this.headText.y = window.innerHeight / 2.3;
            this.headText.anchor.set(0.5)
        }
        
        if(this.started){
            // here if window resizes we remove all the boxes and put again. (because easy and fast for now.)
            this.boxes.forEach(e=> this.mainContainer.removeChild(e)) // remove boxes
            this.StartEnemies()
        }
    }

    private KeyDown = (key:any) => {
        switch (key.code) {
            case 'ArrowUp': // when press arrow up : bunny moves up 10 px
                this.MoveBunnyUp()
                break;
            case 'ArrowDown': // when press arrow down : bunny moves down 10 px
                this.MoveBunnyDown()
                break;
            case 'ArrowRight': // when press arrow ridht : bunny moves right 10 px
                this.MoveBunnyRight()
                break;
            case 'ArrowLeft': // when press arrow left : bunny moves left 10 px
                this.MoveBunnyLeft()
                break;
            case 'Space':
                this.Attack()
                break;
            default:
                console.log(key)
                break;
        }
    }

    private MoveBunnyUp = ():void =>{
        // Moves bunny 10px up
        if(this.bunnyContainer.y -50 > 0){
            this.bunnyContainer.y = this.bunnyContainer.y -10
        }
    }

    private MoveBunnyDown = ():void =>{
        // Moves bunny 10px down
        if(window.innerHeight -70> this.bunnyContainer.y){
            this.bunnyContainer.y = this.bunnyContainer.y +10
        }
    }

    private MoveBunnyRight = ():void =>{
        // Moves bunny 10px right
        if(window.innerWidth -50> this.bunnyContainer.x){
            this.bunnyContainer.x = this.bunnyContainer.x +10
        }
    }

    private MoveBunnyLeft = ():void =>{
        // Moves bunny 10px left
        if(this.bunnyContainer.x > 50){
            this.bunnyContainer.x = this.bunnyContainer.x -10
        }
    }

    private Attack = ():void =>{
        if(this.started){
            this.PrepareAttack()
            console.log('Attack!!!')
        }
    }

    private PrepareAttack = () =>{
        // Prepare attack, create fireballs and throw!
        var textureFirBall:any = PIXI.Texture.from('assets/fireball.png')
        const fireBall = new PIXI.Sprite(textureFirBall)
        // these settings for locating the fireball to bunny's head.
        fireBall.x = this.bunnyContainer.x - 22
        fireBall.y = this.bunnyContainer.y - 55

        this.mainContainer.addChild(fireBall);

        var timer = setInterval(()=>{
            fireBall.y = fireBall.y -20
            for (let i = 0; i < this.boxes.length; i++) {
                const box =  this.boxes[i];
                // if the fireball enters in box's Y(height) area 
                var inYarea = fireBall.y > box.y && fireBall.y < box.y + 54  // +54 because height of the fireball
                // if the fireball enters in box's X(width) area
                var inXarea = fireBall.x + 35 > box.x && fireBall.x < box.x + 54 // + 54 becayse width of the fireball
                if(inYarea && inXarea){  // resultly if the fireball enters in the box area 
                    // then remove the box, remove the fireball. And remove timer which was moving fireball
                    this.mainContainer.removeChild(box)
                    this.boxes = this.boxes.filter(e=> e != box) // remove the box from boxlist
                    this.mainContainer.removeChild(fireBall)
                    clearInterval(timer)
                    if(this.boxes.length == 0) this.GameOver() // if all the boxes finishes then game ower. Restart the game.
                }
            }
            
            if(fireBall.y <= -54) { // if fireball exits from screen then delete it for performance. -54 becase height of the fireball. we want it to exits first then we remove it. 
                this.mainContainer.removeChild(fireBall) // delete fireball
                clearInterval(timer) // delete timer
            }

            console.log(timer)
        }, 100)
    }

    private RemoveDesctiptionsAndStart =  () => {
        // Here we start the game if it's not started.
        if(!this.started){
            this.mainContainer.removeChild(this.headText)
            this.started = true
            this.StartEnemies()
        }
    }

    private StartEnemies = () => {
        var textureBox:any = PIXI.Texture.from('assets/box64x64.png')
        this.boxes = new Array<PIXI.Sprite>();
        // we create boxes with the amount we declared above. 
        for (let i = 0; i < this.boxAmount; i++) {
            var box = new PIXI.Sprite(textureBox)
            var randomX = Math.floor(Math.random() * (window.innerWidth - 100)) // box is 100px. we want box to be create all in the container. we write here -100 because we dont want box to be created in the right side all or half.
            var randomY = Math.floor(Math.random() * (window.innerHeight - 300)) // we dont want box to be carted too near to the bunny. To look better.
            box.x = randomX
            box.y = randomY
            this.boxes.push(box)
            this.mainContainer.addChild(box)
            console.log(box)
        }
        
        // x sıfırdan büyük  window.innerWidth-64 den küçük
        // y sıfırdan büyük window.innerHeight-64 den küçük
    }

    private GameOver = () =>{
        this.started = false
        this.boxAmount = this.boxAmount * 2
        this.AddHeadText()
        this.LocateObjects()
    }

    private WriteFps():void{
        // Here we write FPS in the top of the page. every 1 second.
        var headerContainer:HTMLElement = document.getElementById("header");
        setInterval(()=>{
            var fps:string = this.game.ticker.FPS.toFixed(2);
            headerContainer.innerHTML = "FPS: " + fps 
        },1000)
    }
}

(function() {
    const game: App = new App();
})();

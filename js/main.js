var can1;
var can2;

var canWidth;
var canHeight;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var bgPic=new Image();

var ane;

var fruit;

var mom;
var baby;

var mx;
var my;

var babyTail = [];
var babyEye = [];
var babyBody = [];

var momTail = [];
var momEye = [];
var momBodyOrange = [];
var momBodyBlue = [];

var data;

var wave;

var halo;

var dust;
var dustPic = [];


document.body.onload=game;
function game  (){
    init();
    lastTime=Date.now();
    deltaTime=0;
    gameloop();
}

function init()
{
    //获得canvas context
    can1=document.getElementById("canvas1");
    ctx1=can1.getContext('2d');
    can2=document.getElementById("canvas2");
    ctx2=can2.getContext('2d');

    can1.addEventListener('mousemove', onMouseMove,false);
    bgPic.src = "img/background.jpg"
    canHeight=can1.height;
    canWidth=can1.width;

    ane=new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();
    baby = new babyObj();
    baby.init();

    mx = canWidth*0.5;
    my = canHeight*0.5;

    for(var i=0;i<8;i++)
    {
        babyTail[i] = new Image();
        babyTail[i].src = "img/babyTail" + i + ".png";
    }
    for (var i=0;i<2;i++)
    {
        babyEye[i] = new Image();
        babyEye[i].src = "img/babyEye" + i +".png";
    }
    for(var i=0;i<20;i++)
    {
        babyBody[i] = new Image();
        babyBody[i].src = "img/babyFade" + i + ".png";
    }
    for(var i=0;i<8;i++)
    {
        momTail[i] = new Image();
        momTail[i].src = "img/bigTail"+i+".png";
    }
    for(var i=0;i<2;i++)
    {
        momEye[i] = new Image();
        momEye[i].src = "img/bigEye" + i + ".png";
    }
    data = new dataObj();

    for(var i=0;i<8;i++)
    {
        momBodyOrange[i] = new Image();
        momBodyBlue[i] = new Image();
        momBodyOrange[i].src = "img/bigSwim" + i +".png";
        momBodyBlue[i].src = "img/bigSwim" + i +".png";
    }
    ctx1.font = "30px Verdana";
    ctx1.textAlign="center";

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    for(var i=0;i<7;i++)
    {
        dustPic[i] = new Image();
        dustPic[i].src = "img/dust" + i + ".png";
    }
    dust = new dustObj();
    dust.init();

}
function gameloop()
{
    window.requestAnimationFrame(gameloop);
    var now =Date.now();
    deltaTime=now-lastTime;
    lastTime=now;
    if(deltaTime>40) deltaTime=40;

    drawBackground();
    ane.draw();
    fruitMonitor()
    fruit.draw();
    ctx1.clearRect(0,0,canWidth,canHeight)
    mom.draw();
    baby.draw();
    momFruitsCollision();
    momBabyCollision();

    data.draw();

    wave.draw();

    halo.draw();

    dust.draw();



}
function onMouseMove(e)
{
    if(!data.gameOver)
    {
        if(e.offsetX || e.layerX)
        {
            mx = e.offSetX == undefined ? e.layerX: e.offSetX;
            my = e.offSetY == undefined ? e.layerY: e.offSetY;

        }
    }

}
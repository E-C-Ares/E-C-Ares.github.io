function glive() {
    var stage = new Clay.Stage(800, 600);
    var world = stage.getWorld();
    var camera = stage.getCamera();

    camera.set(0,0,0);
    camera.setResolution(800, 600);
    camera.setTarget(new Clay.Vector(-100,0,100));

    window.onresize = function() {
        stage.resizeTo(
            800,600
        );
    };

    window.onresize();
    Clay.Collada.load('XML/earth.xml', function (scene) {
        scene.init(stage);

        var earth = new Clay.Texture('PNG/earth.jpg', stage);

        var clouds = new Image();
        clouds.src = 'PNG/cloudView.png';

        //var dark = new Image();
        //dark.src = 'PNG/darkside.png';

        var waiting = setInterval(function(){
            if (earth.complete && clouds.complete){//&& dark.complete){
                clearInterval(waiting);
                play();
            }
        }, 1000);

        function play() {
            var shape = world.getShapes()[0];
            shape.setMaterial(earth);

            var x, y, z, t = Math.PI/4, r = 0, tick = 0.01, radius = 200;
            var ttx = earth.canvas.getContext('2d');
            var base = earth.image;
            var wind = 0;

            stage.addEvent('enterframe', function(){

                ttx.drawImage(base, 0,0);
                var pos = (++wind)%1000;
                ttx.drawImage(clouds, pos, 0);
                ttx.drawImage(clouds, pos-1000, 0);
                //ttx.drawImage(dark, 0,0);

                t += tick;
                x = -100 + Math.sin(t) * radius;
                z = 100 + Math.cos(t) * radius;
                y = Math.cos(t/3) * 50
                camera.set(x, y, z);
            });

            stage.run();
        }
    });
}
window.addEventListener('load', function(){
    new glive();
}, false);
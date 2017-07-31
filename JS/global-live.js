function glive() {
    var stage = new Clay.Stage(800, 600);
    var world = stage.getWorld();
    var camera = stage.getCamera();

    camera.set(0, 0, 0);
    camera.setResolution(800, 600);
    camera.setTarget(new Clay.Vector(-100, 0, 100));

    window.onresize = function () {
        stage.resizeTo(
            window.innerWidth || document.documentElement.clientWidth,
            window.innerHeight || document.documentElement.clientHeight
        );
    };

    window.onresize();

    Clay.Collada.load('../XML/ground.xml', function (scene) {
        scene.init(stage);

        var e = new Clay.Texture('../PNG/simpleRectMap.png', stage);

        var clouds = new Image();
        clouds.src = '../PNG/cloudView.png';

        //var dark = new Image();
        //dark.src = 'static/collada/darkside.png';

        var waiting = setInterval(function () {
            if (ground.complete && clouds.complete) {
                clearInterval(waiting);
                play();
            }
        }, 1000);

        function play() {
            var shape = world.getShapes()[0];
            shape.setMaterial(ground);

            var x, y, z, t = Math.PI / 4, r = 0, tick = 0.01, radius = 200;
            var ttx = ground.canvas.getContext('2d');
            var base = ground.image;
            var wind = 0;

            stage.addEvent('enterframe', function () {

                ttx.drawImage(base, 0, 0);
                var pos = (++wind) % 1000;
                ttx.drawImage(clouds, pos, 0);
                ttx.drawImage(clouds, pos - 1000, 0);
                // ttx.drawImage(dark, 0,0);

                t += tick;
                x = -100 + Math.sin(t) * radius;
                z = 100 + Math.cos(t) * radius;
                y = Math.cos(t / 3) * 50
                camera.set(x, y, z);
            });

            stage.run();
        }
    });
}

window.addEventListener('load', function () {
    new glive();
}, false);
/**
 * Create the voyage
 * @param c         domElement  the container
 * @constructor
 */
var Voyage = function(c)
{
    var container = c;
    var scene;
    var camera;
    var renderer;
    var _this = this;
    var step = 0;

    // Private methods:

    /**
     * Window resize listener
     * @param e
     */
    var resizeListener = function (e) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
    };

    /**
     * Initialize
     */
    var init = function()
    {
        renderer    = new THREE.WebGLRenderer();
        scene       = new THREE.Scene();
        camera      = new THREE.PerspectiveCamera(
            45,
            window.innerWidth / window.innerHeight,
            0.1,
            10000
        );
        renderer.setSize(window.innerWidth, window.innerHeight);
        scene.add(camera);
        container.appendChild(renderer.domElement);

        // Event listeners:
        window.addEventListener('resize', resizeListener);
    };

    // constructor
    (function(){
        init();
    })();

    // Public methods:

    /**
     * Animation handler
     */
    this.animate = function()
    {
        requestAnimationFrame(_this.animate);

        renderer.clear();
        renderer.render(scene, camera);
        camera.lookAt(scene.position);
        step += 0.002;
        camera.position.x = Math.sin(step) * 500;
        camera.position.z = Math.cos(step) * 500;
    };

    /**
     * Randomize the scene, this is where the main fun happens:
     */
    this.randomize = function()
    {
        console.log('Randomizing...');
        var type = Math.floor(Math.random());   // This determines what kind of scene we are going to make
        switch(type)
        {
            case 0 :
            {
                // For debugging purposes: create a light:
                var light = new THREE.DirectionalLight(0xFFFFFF);
                light.position.set(1, 0.5, -1);
                scene.add(light);

                // Create the planet:
                console.log('Creating planet...');
                var lightMap = new Texture(1024, 512, 'noise', {
                    repeat: true
//                    debug: true
                });

                var ringMap = new Texture(512, 512, 'stripes', {
                    color: 0xFFFFFF/*,
                    debug: true*/
                });

                var planet = new Planet(
                    camera,
                    100,
                    {
                        lightMap: lightMap,
                        ringMap: ringMap
                    },
                    {
                        color: 0xFFFFFF,
                        innerSize:.85,
                        outerSize: 6
                    },
                    {
                        active: true,
                        radius: 200,
                        width: .5
                    }
                );
                scene.add(planet.object);
                camera.position.z = -500;
                camera.position.y = 200;
                camera.lookAt(scene.position);
                break;
            }
            case 1 :
            {
                // nebula

                break;
            }
            case 2 :
            {
                // galaxy

                break;
            }
            case 3 :
            {
                // star field

                break;
            }
        }
    };
};
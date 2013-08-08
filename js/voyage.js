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

    // constructor
    (function(){
        _this.init();
    })();

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

    // Public methods:

    /**
     * Animation handler
     */
    this.animate = function()
    {
        requestAnimationFrame(_this.animate);
        renderer.clear();
        renderer.render(scene, camera);
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
                // Create the planet:
                console.log('Creating planet...');
                var planet = new Planet(
                    100,
                    {},
                    {},
                    false
                );
                scene.add(planet.object);
                camera.position.z = -500;
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
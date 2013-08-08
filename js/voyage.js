var Voyage = function(c)
{
    var container = c;
    var scene;
    var camera;
    var renderer;
    var _this = this;

    // Private methods:

    /**
     * Window resize listener
     * @param e
     */
    var resizeListener = function (e) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
    };

    // Public methods:

    /**
     * Initialize
     */
    this.init = function()
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

    /**
     * Animation handler
     */
    this.animate = function()
    {
        requestAnimationFrame(_this.animate);
        renderer.clear();
        renderer.render(scene, camera);
    }
};
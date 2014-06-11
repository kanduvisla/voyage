/**
 * Spacefog
 */

var Spacefog = function()
{
    var object = new THREE.Object3D();

    var debugMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    /**
     * Constructor
     */
    (function(){
        var lightMap = new Texture(1024, 512, 'noise', {
            repeat: true
        });

        var fogSphere = new THREE.Mesh(
            new THREE.SphereGeometry(),
            lightMap
        );

//         object.add(fogSphere);
    })();

    this.object = object;
};
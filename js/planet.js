/**
 * A planet
 * @param pRadius       int
 * @param pTextures     object  {lightMap, darkMap, cloudMap, specularMap [,ringMap]}
 * @param pHalo         object  {color, opacity, innerSize, outerSize}
 * @param pRings        object  {active, radius, width}
 * @constructor
 */
var Planet = function(pRadius, pTextures, pHalo, pRings)
{
    var radius      = pRadius;
    var textures    = pTextures;
    var halo        = pHalo;
    var rings       = pRings !== null ? pRings : {active: false};

    var debugMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    var object;

    /**
     * Auto executing constructor:
     */
    (function(){
        object = new THREE.Object3D();
        var texture = new THREE.Texture(textures.lightMap.baseImage);
        texture.needsUpdate = true;
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 40, 40),
            // debugMaterial
            new THREE.MeshLambertMaterial({
                // color: 0xFF0000,
                map: texture
            })
        );
        object.add(sphere);

        if(rings.active) {
            // Add a ring:
            // new THREE.RingGeometry())
            var curve = new THREE.SplineCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 1, 0)
            ]);
            var geometry = new THREE.TubeGeometry(curve, 1, rings.radius, 40);
            for(var i=40; i<80; i++) {
                geometry.vertices[i].y = 0;
                geometry.vertices[i].divideScalar(1 + rings.width);
            }
            var ring = new THREE.Mesh(geometry, debugMaterial);
            object.add(ring);
        }
    })();

    // Public properties:

    this.object = object;
};
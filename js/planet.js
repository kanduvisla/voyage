/**
 * A planet
 * @param pRadius       int
 * @param pTextures     object  {lightMap, darkMap, cloudMap, specularMap [,ringMap]}
 * @param pHalo         object  {color, opacity, innerSize, outerSize}
 * @param pRings        boolean
 * @constructor
 */
var Planet = function(pRadius, pTextures, pHalo, pRings)
{
    var radius      = pRadius;
    var textures    = pTextures;
    var halo        = pHalo;
    var rings       = pRings !== null ? pRings : false;

    var debugMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    var object;

    /**
     * Auto executing constructor:
     */
    (function(){
        object = new THREE.Object3D();
        var mesh = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 40, 40),
            debugMaterial
        );
        object.add(mesh);
    })();

    // Public properties:

    this.object = object;
};
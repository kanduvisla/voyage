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

        // The sphere:
        var lightTexture = new THREE.Texture(textures.lightMap.baseImage);
        lightTexture.needsUpdate = true;
        var sphere = new THREE.Mesh(
            new THREE.SphereGeometry(radius, 40, 40),
            // debugMaterial
            new THREE.MeshLambertMaterial({
                // color: 0xFF0000,
                map: lightTexture
            })
        );
        object.add(sphere);

        if(rings.active) {
            // Add a ring:
            var curve = new THREE.SplineCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(0, 200, 0)
            ]);
            var steps = 200;
            var geometry = new THREE.TubeGeometry(curve, 1, rings.radius, steps);
            for(var i=steps; i<steps*2; i++) {
                geometry.vertices[i].y = 0;
                geometry.vertices[i].divideScalar(1 + rings.width);
                geometry.faceVertexUvs[0][i-steps][0].x = 0;
                geometry.faceVertexUvs[0][i-steps][0].y = 0;
                geometry.faceVertexUvs[0][i-steps][1].x = 1;
                geometry.faceVertexUvs[0][i-steps][1].y = 1;
                geometry.faceVertexUvs[0][i-steps][2].x = 1;
                geometry.faceVertexUvs[0][i-steps][2].y = 1;
                geometry.faceVertexUvs[0][i-steps][3].x = 0;
                geometry.faceVertexUvs[0][i-steps][3].y = 0;
            }
            var ringTexture = new THREE.Texture(textures.ringMap.baseImage);
            ringTexture.needsUpdate = true;
            var ring = new THREE.Mesh(
                geometry,
                new THREE.MeshLambertMaterial({
                    map: ringTexture,
                    transparent: true
                })
            );

            console.log(geometry);
            object.add(ring);
        }

        // Clouds:
        var clouds = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.01, 40, 40),
            debugMaterial
        );
        object.add(clouds);

        // The halo:
        var halo = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.05, 40, 40),
            debugMaterial
        );
        object.add(halo);
    })();

    // Public properties:

    this.object = object;
};
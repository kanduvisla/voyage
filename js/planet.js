/**
 * A planet
 * @param pCamera       camera
 * @param pRadius       int
 * @param pTextures     object  {lightMap, darkMap, cloudMap, specularMap [,ringMap]}
 * @param pHalo         object  {color, innerSize, outerSize}
 * @param pRings        object  {active, radius, width}
 * @constructor
 */
var Planet = function(pCamera, pRadius, pTextures, pHalo, pRings)
{
    var radius      = pRadius;
    var textures    = pTextures;
    var halo        = pHalo;
    var rings       = pRings !== null ? pRings : {active: false};
    var camera      = pCamera;

    var debugMaterial   = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});

    var object;

    /**
     * Auto executing constructor:
     */
    (function(){
        object = new THREE.Object3D();

        // The halo:
        var haloMaterial = new THREE.ShaderMaterial({
            uniforms: {
                "c":        {type: "f", value: pHalo.innerSize},
                "p":        {type: "f", value: pHalo.outerSize},
                glowColor:  {type: "c", value: new THREE.Color(pHalo.color)},
                viewVector: {type: "v3", value: camera.position}
            },
            vertexShader:   document.getElementById('haloVertexShader').textContent,
            fragmentShader: document.getElementById('haloFragmentShader').textContent,
            side:           THREE.BackSide,
            blending:       THREE.AdditiveBlending,
            transparent:    true
        });
        var halo = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.05, 40, 40),
            haloMaterial
        );

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

        if(rings.active) {
            // Add a ring:
/*            var curve = new THREE.SplineCurve3([
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
            object.add(ring);*/
        }

        object.add(sphere);
        object.add(halo);

        // Clouds:
        var clouds = new THREE.Mesh(
            new THREE.SphereGeometry(radius * 1.01, 40, 40),
            debugMaterial
        );
        object.add(clouds);

    })();

    // Public properties:

    this.object = object;
};
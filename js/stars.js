/**
 * Starry background
 */

var Stars = function(starCount, starDistance, starSize)
{
    var object;

    /**
     * Constructor:
     */
    (function(){
        object = new THREE.Object3D();

        // Generate particles that form the stars:
//        var starCount = 1800;
//        var starDistance = 20000;

        var starMaterial = new THREE.ParticleBasicMaterial({
            color: 0xFFFFFF,
            size: starSize
        });
        var starParticles = new THREE.Geometry();

        for(var i=0; i<starCount; i++) {

            // Distribute evenly:
            var x = -1 + Math.random() * 2;
            var y = -1 + Math.random() * 2;
            var z = -1 + Math.random() * 2;
            var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
            x *= d;
            y *= d;
            z *= d;

            var starParticle = new THREE.Vector3(
                   x * starDistance,
                   y * starDistance,
                   z * starDistance
            );

            starParticles.vertices.push(starParticle);
        }

        var starParticleSystem = new THREE.ParticleSystem(
            starParticles, starMaterial
        );

        object.add(starParticleSystem);
    })();

    this.object = object;
};
/**
 * A Procedural texture class
 * @param pWidth
 * @param pHeight
 * @param pType     The type: color,noise
 * @param pOptions  An object with options, varies for each type...
 * @constructor
 */
var Texture = function(pWidth, pHeight, pType, pOptions)
{
    // For debugging purposes:
    var debug   = true;
    var image;
    var ctx;
    var width   = pWidth;
    var height  = pHeight;
    var _this   = this;
    var type    = pType;
    var options = pOptions;

    // private functions:

    var fill = function(color)
    {
        ctx.fillStyle = color.toString(16);
        ctx.fillRect(0, 0, width, height);
    };

    /* Following canvas-based Perlin generation code originates from
     * iron_wallaby's code at: http://www.ozoneasylum.com/30982
     */
    var randomNoise = function(context) {
        context = context || ctx;
        var imageData = context.getImageData(0, 0, width, height),
            random = Math.random,
            pixels = imageData.data,
            n = pixels.length,
            i = 0;
        while (i < n) {
            pixels[i++] = pixels[i++] = pixels[i++] = (random() * 256) | 0;
            pixels[i++] = 255;
        }
        context.putImageData(imageData, 0, 0);
    };

    var perlinNoise = function(detail) {
        // Create off screen noise:
        var noise       = document.createElement('canvas');
        noise.width     = width;
        noise.height    = height;
        randomNoise(noise.getContext('2d'));

        detail          = detail || 4;

        ctx.save();

        /* Scale random iterations onto the canvas to generate Perlin noise. */
        for (var size = detail; size <= noise.width; size *= 2) {
            var x = (Math.random() * (noise.width - size)) | 0,
                y = (Math.random() * (noise.height - size)) | 0;
            ctx.globalAlpha = detail / size;
            ctx.drawImage(noise, x, y, size, size, 0, 0, width, height);
        }

        ctx.restore();
    };

    /**
     * Constructor:
     */
    (function(){
        image = document.createElement('canvas');
        image.width = width;
        image.height = height;
        if(debug) {
            image.style.zIndex = 100;
            image.style.position = 'fixed';
            image.style.left = '10px';
            image.style.top = '10px';
            document.body.appendChild(image);
        }
        ctx = image.getContext('2d');
        switch(type) {
            case 'color' :
            {
                console.log('Creating color texture...');
                fill(options.color);
                break;
            }
            case 'noise' :
            {
                console.log('Creating noise texture...');
                perlinNoise();
                break;
            }
        }
    })();

};
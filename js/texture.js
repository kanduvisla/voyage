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
    var image;
    var ctx;
    var baseImage;
    var width   = pWidth;
    var height  = pHeight;
    var _this   = this;
    var type    = pType;
    var options = pOptions;
    var debug   = options.debug || false;

    if(pOptions.repeat) {
        options.repeatSize = pOptions.repeatSize || width / 4;
        width += options.repeatSize;
        height += options.repeatSize;
    } else {
        options.repeatSize = 0;
    }

    // private functions:

    /**
     * Fill with a sold
     * @param color
     */
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

        var aspect = width > height ? width : height;

        /* Scale random iterations onto the canvas to generate Perlin noise. */
        for (var size = detail; size <= noise.width; size *= 2) {
            var x = (Math.random() * (noise.width - size)) | 0,
                y = (Math.random() * (noise.width - size)) | 0;
            ctx.globalAlpha = detail / size;
            ctx.drawImage(noise, x, y, size, size, 0, 0, aspect, aspect);
        }

        ctx.restore();
    };

    /**
     * Stripes
     */
    var stripes = function()
    {
        var currentY = 20;
        // console.log('1px solid #' + options.color.toString(16));
        ctx.lineWidth = 20;
        while(currentY < height) {
            ctx.strokeStyle = '#' + options.color.toString(16);
            ctx.beginPath();
            ctx.moveTo(0, currentY);
            ctx.lineTo(width, currentY);
            ctx.stroke();
            // currentY += Math.random() * (height / 10);
            currentY += 40;
        }
    };

    var composite = function()
    {
        for(var t in options.textures) {
            var obj = options.textures[t];
            if(!obj.opacity)    { obj.opacity = 1; }
            if(!obj.blendmode)  { obj.blendmode = 'source-over'; }
            // obj.texture.baseImage.style.opacity = obj.opacity;
            ctx.globalAlpha                 = obj.opacity;
            ctx.globalCompositeOperation    = obj.blendmode;
            ctx.drawImage(obj.texture.baseImage, 0, 0);
        }
    };

    /**
     * Constructor:
     */
    (function(){
        // BaseImage is the original image;
        baseImage           = document.createElement('canvas');
        baseImage.width     = width - options.repeatSize;
        baseImage.height    = height - options.repeatSize;
        image               = document.createElement('canvas');
        image.width         = width;
        image.height        = height;
        if(debug) {
            baseImage.style.zIndex = 100;
            document.body.insertBefore(baseImage, document.body.firstChild);
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
            case 'stripes' :
            {
                console.log('Creating stripes texture...');
                stripes();
                break;
            }
            case 'composite' :
            {
                console.log('Creating composite texture...');
                composite();
                break;
            }
        }
        if(options.repeat)
        {
            console.log('Repeating the texture...');
            // Repeat the image (this does some cropping):
            var rightImagePart = ctx.getImageData(width - options.repeatSize, 0, options.repeatSize, height);
            var leftImagePart  = ctx.getImageData(0, 0, options.repeatSize, height);
            // Copy it to the left, with a fade:
            var n = rightImagePart.data.length;
            var i = 0;
            var j = 0;
            var p = 0;
            while(i < n)
            {
                // Mix the colors:
                p = ((i/4)%options.repeatSize) / options.repeatSize;
                for(j=0; j<4; j++) {
                    leftImagePart.data[i+j] = Math.round((leftImagePart.data[i+j] * p) +
                        (rightImagePart.data[i+j] * (1-p)));
                }
                i+=4;
            }
            ctx.putImageData(leftImagePart, 0, 0);
            var topImagePart = ctx.getImageData(0, 0, width, options.repeatSize);
            var bottomImagePart  = ctx.getImageData(0, height - options.repeatSize, width, options.repeatSize);
            // Copy it to the top, with a fade:
            n = bottomImagePart.data.length;
            i = 0;
            p = 0;
            while(i < n)
            {
                // Mix the colors:
                // p = (((i/4)%width)%options.repeatSize) / options.repeatSize;
                p = Math.floor(((i/4)/width)%options.repeatSize) / options.repeatSize;

                for(j=0; j<4; j++) {
                    topImagePart.data[i+j] = Math.round((topImagePart.data[i+j] * p) +
                        (bottomImagePart.data[i+j] * (1-p)));
                }
                i+=4;
            }
            ctx.putImageData(topImagePart, 0, 0);
        }
        // Debug rectangles:
        if(debug) {
            ctx.fillStyle = '#ff0000';
            ctx.fillRect(0, 0, 10, 10);
            ctx.fillStyle = '#00ff00';
            ctx.fillRect(width - 10 - options.repeatSize,
                height - 10 - options.repeatSize, 10, 10);
        }
        // Apply filters:
        if(options.filters)
        {
            var filterTxt = '';
            for(var key in options.filters)
            {
                filterTxt += key + '(' + options.filters[key] + ') ';
            }
            baseImage.style.webkitFilter = filterTxt;
        }
        // Draw the final image:
        baseImage.getContext('2d').drawImage(image, 0, 0);
    })();

    // Public properties
    this.baseImage = baseImage;
};
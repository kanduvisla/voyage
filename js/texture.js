/**
 * A Procedural texture class
 * @param pWidth
 * @param pHeight
 * @param pType
 * @param pOptions
 * @constructor
 */
var Texture = function(pWidth, pHeight, pType, pOptions)
{
    // For debugging purposes:
    var debug = true;
    var image;
    var width   = pWidth;
    var height  = pHeight;

    /**
     * Constructor:
     */
    (function(){
        image = document.createElement('img');
        image.width = width;
        image.height = height;
        if(debug) {
            image.style.zIndex = 100;
            image.style.position = 'fixed';
            image.style.left = '10px';
            image.style.top = '10px';
            document.body.appendChild(image);
        }
    })();
};
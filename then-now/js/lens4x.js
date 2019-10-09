/* 
Playing with svg to get microscope zoom
*/

// Function called with params from HTML
function showLens (containerID, baseImagePath, revealedImagePath, width, height, optionalParams) { 
    // default values
    var lensW = 250, lensH = 200;
    // var startX = 0, startY = 0; 
    // start in center
    var startX = (width/2)-(lensW/2), startY = (height/2)-(lensH/2); // (height/2)-(lensH/2)
    var gain = 1;
    var shape = "rect";

    // Process optional parameters.
    if (typeof optionalParams !== 'undefined') {
        if (typeof optionalParams === 'string') {
            parameters = parseParameters(optionalParams);
            // console.log(' --- parameters - startX: ' + parameters["startX"]);
            if ( typeof(parameters["lensW"]) !== 'undefined'){ 
                // console.log(' --- lensW not undefined (aka defined): ' + parameters["lensW"]);
                lensW = parameters["lensW"]; 
            }
            if (typeof(parameters["gain"]) !== 'undefined'){ gain = Number(parameters["gain"]); }
            if (typeof(parameters["shape"]) !== 'undefined'){ shape = parameters["shape"]; }
            if (typeof(parameters["lensW"]) !== 'undefined'){ lensW = parameters["lensW"]; }
            if (typeof(parameters["lensH"]) !== 'undefined'){ lensH = parameters["lensH"]; }
            if (typeof(parameters["startX"]) !== 'undefined'){ startX = parameters["startX"]; }
            if (typeof(parameters["startY"]) !== 'undefined'){ startY = parameters["startY"]; }
        }
    }

    // for circle, start point is center, not upper left
    // This distinction doesn't work when startX and startY paramas are passed -- those
    // only work for 1:1 (no gain)
    if (shape == "circle") {
        startX = (width/2);
        startY = (height/2); 
    }

    // add padding to container and append svg
    // adding padding bottom here, dynamically, is critical
    var lensSvg = d3.select("#" + containerID)
            .attr(
                "style",
                "padding-bottom: " + Math.ceil(height * 100 / width) + "%"
            )
            .append("svg")
            // new for micro
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", "0 0 " + width + " " + height);

    // --- THE IMAGES ---

    // Base image
    lensSvg
        // .attr("transform","translate(50,50)")
        .append("svg:image")
        .attr("x", 0)
        .attr("y", 0)
        .attr("xlink:href", baseImagePath)
        .attr("width", width)
        .attr("height", height)
        ;

    // the Revealed image 
    var theRevealed = lensSvg.append("svg:image")
        .attr("id", "lens-image")
        // start centered
        // First factor would move center of large image to left edge 
        // of view box, second factor moves that center of large image 
        // back to center of view box.
        .attr("x", -(width*gain)/2 + width/2)
        .attr("y", -(height*gain)/2 + height/2)
        .attr("xlink:href", revealedImagePath)
        .attr("width", gain*width)
        .attr("height", gain*height)
        ;

    // ---- THE LENS

    // drag border and clip with it
    var drag = d3.drag()
        .on("drag", function() {
            // var clippy = d3.select('#clip rect');
            // clippy.attr('x', +clippy.attr('x') + d3.event.dx);
            // clippy.attr('y', +clippy.attr('y') + d3.event.dy);
            // var border = d3.select('#lens-border');
            // border.attr('x', +border.attr('x') + d3.event.dx);
            // border.attr('y', +border.attr('y') + d3.event.dy);

            // var clippy = d3.select('#clip circle');

            // select lens parts
            var clippy = d3.select('#clip #clipShape');
            var border = d3.select('#lens-border');
            // manipulation varies depending on shape
            if (shape == "circle") {
                clippy.attr('cx', +clippy.attr('cx') + d3.event.dx);
                clippy.attr('cy', +clippy.attr('cy') + d3.event.dy);
                border.attr('cx', +border.attr('cx') + d3.event.dx);
                border.attr('cy', +border.attr('cy') + d3.event.dy);                
            } else { // rect
                clippy.attr('x', +clippy.attr('x') + d3.event.dx);
                clippy.attr('y', +clippy.attr('y') + d3.event.dy);
                border.attr('x', +border.attr('x') + d3.event.dx);
                border.attr('y', +border.attr('y') + d3.event.dy);                
            }

            // Move theRevealed image in proportion to the gain
            theRevealed.attr('x', +theRevealed.attr('x') - (gain-1)*(d3.event.dx)); //(gain/2)
            theRevealed.attr('y', +theRevealed.attr('y') - (gain-1)*(d3.event.dy));
        });

    // add border 
    // create circle or rect
    var lensBorder;
    if (shape == "circle") {
        lensBorder = lensSvg.append("svg:circle");
    } else { // rect
        lensBorder = lensSvg.append("svg:rect");
    }
    lensBorder.attr("id", "lens-border")
        .style("fill-opacity", 0)
        .style("stroke", "#FFFFFF") // 7d7664
        .style("stroke-width", 1)
        // this is the selectable, dragable element
        .style('cursor', 'move')
        .call(drag);

    setShape(lensBorder);

    // add lens #clip
    // create circle or rect. Clip path has to be added first,
    // and it seems that that shape has to be appended in one fell swoop.
    var lensGlass; 
    if (shape == "circle") {
        lensGlass = lensSvg.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:circle")
        // .attr("id", "clipShape");
    } else { // currently jus rect
        lensGlass = lensSvg.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
    }
    lensGlass.attr("id", "clipShape");

    setShape(lensGlass);

    // add lens and drag to foreground image
    d3.select("#lens-image")
        .attr("clip-path", function(d,i) { return "url(#clip)"; });
    
    function setShape(lensElement) {
        console.log("-- shape: " + shape);
        if (shape == "circle") {
            lensElement.attr('cx', startX)
                .attr('cy', startY)
                .attr('r', 100)
                ;                              
        } else {
            lensElement.attr('x', startX)
                .attr('y', startY)
                .attr('width', lensW)
                .attr('height', lensH)
                .attr('rx', 15)
                .attr('ry', 15)
                ;                  
        }
    }

} // end showLens


function parseParameters(params) { 
    var parsedParams = [];
    if (typeof params === 'object') {
        parsedParams = params;
    } else if (typeof params === 'string') {
        var splitParams = params.split('&');
        for (var i = 0, j = splitParams.length; i < j; i++) {
            var nameValuePair = splitParams[i];
            // console.log(' --- in parseParameters, nameValuePair ' + splitParams[i]);
            var sep = nameValuePair.indexOf('=');
            if (sep > 0) {
                var pName = nameValuePair.substring(0, sep)
                var pValue = nameValuePair.substring(sep + 1)
                parsedParams[pName] = pValue;
            }
        }
    }
    return parsedParams;
}

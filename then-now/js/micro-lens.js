/* 
Playing with svg to get microscope zoom
*/

// Function called with params from HTML
function showLens (containerID, baseImagePath, revealedImagePath, width, height, optionalParams) { 
    var lensW = 250, lensH = 200;
    // var startX = 0, startY = 0; 
    // start in center
    var startX = (width/2)-(lensW/2), startY = (height/2)-(lensH/2); // (height/2)-(lensH/2)
    var gain = 2;

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
            if (typeof(parameters["lensH"]) !== 'undefined'){ lensH = parameters["lensH"]; }
            if (typeof(parameters["startX"]) !== 'undefined'){ startX = parameters["startX"]; }
            if (typeof(parameters["startY"]) !== 'undefined'){ startY = parameters["startY"]; }
        }
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
            var clippy = d3.select('#clip rect');
            clippy.attr('x', +clippy.attr('x') + d3.event.dx);
            clippy.attr('y', +clippy.attr('y') + d3.event.dy);
            var border = d3.select('#lens-border');
            border.attr('x', +border.attr('x') + d3.event.dx);
            border.attr('y', +border.attr('y') + d3.event.dy);
            // try zoom scaling here -- on theRevealed image
            theRevealed.attr('x', +theRevealed.attr('x') - 1*(d3.event.dx));
            theRevealed.attr('y', +theRevealed.attr('y') - 1*(d3.event.dy));

        });

    // add border 
    // d3.select("svg g").append("svg:rect")
    lensSvg.append("svg:rect")
        .attr("id", "lens-border")
        .attr('x', startX)
        .attr('y', startY)
        .attr('width', lensW)
        .attr('height', lensH)
        .attr('rx', 15)
        .attr('ry', 15)
        .style("fill-opacity", 0)
        .style("stroke", "#7d7664")
        .style("stroke-width", 1)
        // this is the selectable, dragable element
        .style('cursor', 'move')
        .call(drag);
        ;

    // add lens #clip
    // var clip = d3.select("svg g").append("svg:clipPath")
    lensSvg.append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr('x', startX)
        .attr('y', startY)
        .attr('rx', 15)
        .attr('ry', 15)
        .attr('width', lensW)
        .attr('height', lensH)
        ;

    // add lens and drag to foreground image
    d3.select("#lens-image")
        .attr("clip-path", function(d,i) { return "url(#clip)"; });
    
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

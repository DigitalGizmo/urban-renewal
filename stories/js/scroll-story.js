// Midway on shifting element objects and names to arrays in order to 
// create multi-chapter loops for each task.

var ctrl = new ScrollMagic.Controller();

// Defin arrays for target elements

var imageSeqElems = [$("#image-sequence1"), $("#image-sequence2")];
var imageSeqNames = ["#image-sequence1", "#image-sequence2"];


// ----- Hide images ----
// Hide all but title and first image
// $("#image-sequence1").children().each(function(i) {
imageSeqElems[0].children().each(function(i) {
	// Skip fist child, the title, and first image -- it's a pin, not a transition
	if (i > 0) {
		TweenMax.set(this, {autoAlpha:0});
	}
});

// Hide all but title and first image
imageSeqElems[1].children().each(function(i) {
	// Skip fist child, the title, and first image -- it's a pin, not a transition
	if (i > 1) {
		TweenMax.set(this, {autoAlpha:0});
	}
});


// --- Pin Chapter Titles ---
// Set pin for first chapter TITLE
var containerScene = new ScrollMagic.Scene({
	triggerElement: "#chapter1-title", // point of execution
	duration: $("#chapter1").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
})
.setPin("#chapter1-title", {pushFollowers: false})
.addIndicators()
.addTo(ctrl);

// Set pin for 2nd chapter TITLE Hope or Hoax
var containerScene = new ScrollMagic.Scene({
	triggerElement: "#chapter2-title", // point of execution
	// Total HACK! Chapter 2 height isn't working
	duration: $("#chapter1").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
})
.setPin("#chapter2-title", {pushFollowers: false})
.addIndicators()
.addTo(ctrl);

// Set pin for 3rd chapter TITLE
var containerScene = new ScrollMagic.Scene({
	triggerElement: "#chapter3-title", // point of execution
	duration: $("#chapter3").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
})
.setPin("#chapter3-title", {pushFollowers: false})
.addIndicators()
.addTo(ctrl);

// Set pin for 4th chapter TITLE
var containerScene = new ScrollMagic.Scene({
	triggerElement: "#chapter4-title", // point of execution
	duration: $("#chapter4").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
})
.setPin("#chapter4-title", {pushFollowers: false})
.addIndicators()
.addTo(ctrl);



// --- Pin Gallery images
// Set pin for first GALLERY Image container
// Chapter 1 - Immediate Response
var containerScene = new ScrollMagic.Scene({
	triggerElement: imageSeqNames[0], // point of execution
	duration: $("#caption-sequence1").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
	offset: -50 // was 320
})
.setPin(imageSeqNames[0], {pushFollowers: false})
.addIndicators()
.addTo(ctrl);

// Set pin for Image container
// Chapter 4 - Designing South Mall
var containerScene = new ScrollMagic.Scene({
	triggerElement: imageSeqNames[1], // point of execution
	duration: $("#caption-sequence2").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
	offset: -50 // was 320
})
.setPin(imageSeqNames[1], {pushFollowers: false})
.addIndicators()
.addTo(ctrl);



// Create scenes
// Loop through all divs in text-panel
// Chapter 1 Immediate Response
$("#caption-sequence1").children().each(function(i) {
	// Skip first image -- it's a pin, not a transition
	if (i > 0) {
		// Current target is +1 because 1st div in image panel is title
		var targetPrev = imageSeqElems[0].children().eq(i -1);
		let target = imageSeqElems[0].children().eq(i);

		var tl = new TimelineMax();
		// Base transitin condition class name
		// "this" is not a jQuery object, so need straight JS
		tl.to(target, 2, {autoAlpha:1})
			.to(targetPrev, 1, {autoAlpha:0});			

		new ScrollMagic.Scene({
			triggerElement: this,
			duration: 350, // pin the element for a total of 400px
			triggerHook: .8, // trigger low in the viewport
		})
		.setTween(tl)
		// .on('start', function() {
		// 	console.log("-- targPrev: " + i + " target: " + (i+1));
		// })
		.addIndicators()
		.addTo(ctrl);
	} // end if i > 0
});





// Create scenes
// Loop through all divs in text-panel
// ----- Chapter 4 Designing South Mall ----
$("#caption-sequence2").children().each(function(i) {
	// Skip first image -- it's a pin, not a transition
	if (i > 0) {
		// Current target is +1 because 1st div in image panel is title
		var targetPrev = imageSeqElems[1].children().eq(i);
		let target = imageSeqElems[1].children().eq(i + 1);

		var tl = new TimelineMax();
		// Base transitin condition class name
		// "this" is not a jQuery object, so need straight JS
		tl.to(target, 2, {autoAlpha:1})
			.to(targetPrev, 1, {autoAlpha:0});			

		new ScrollMagic.Scene({
			triggerElement: this,
			duration: 350, // pin the element for a total of 400px
			triggerHook: .8, // trigger low in the viewport
		})
		.setTween(tl)
		// .on('start', function() {
		// 	console.log("-- Chap2 targPrev: " + i + " target: " + (i+1));
		// })
		.addIndicators()
		.addTo(ctrl);
	} // end if i > 0
});

// --------- MAP -------------

// Set pin for wide map
var containerScene = new ScrollMagic.Scene({
    // triggerElement: '.container0',
    triggerElement: '#image-sequence3',
	duration: $("#caption-sequence3").height(),
	triggerHook: 0, // don't trigger until #pinned-trigger1 hits the top of the viewport
	offset: -50 // was 320
})
.setPin("#image-sequence3", {pushFollowers: false})
.on('start', function () {
    // console.log("passed trigger");
    // setPoint defined in simpl-map.js
    setPoint(42.6503, -73.758, 15, 'none');
	// treatmap.setView([42.5, -72], 11) ;
})
.addIndicators()
.addTo(ctrl);

// Add Take area before zooming
var mapScene = new ScrollMagic.Scene({
    triggerElement: '#thing3'
    // duration: 3500, // was 1300
    // duration: $(".text-panel").height(),
    // offset: 200 // was 320
})
.on('start', function () {
    // setPoint defined in simpl-map.js
    setPoint(42.6503, -73.758, 15, 'take');
})
.addIndicators()
.addTo(ctrl);

// Add Take area before zooming
var mapScene = new ScrollMagic.Scene({
    triggerElement: '#thing4'
    // duration: 3500, // was 1300
    // duration: $(".text-panel").height(),
    // offset: 200 // was 320
})
.on('start', function () {
    // setPoint defined in simpl-map.js
    setPoint(42.649912, -73.762082, 16, 'take');
})
.addIndicators()
.addTo(ctrl);

// Second thing
var mapScene = new ScrollMagic.Scene({
    triggerElement: '#thing5'
    // duration: $(".text-panel").height(),
    // offset: 200 // was 320
})
.on('start', function () {
    setPoint(42.651189, -73.756739, 17, 'none');
})
.addIndicators()
.addTo(ctrl);




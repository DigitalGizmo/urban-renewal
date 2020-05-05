// Vue app

var mapApp = new Vue({
  el: '#app',
  data: { 
    mockupOn : false,
    // Hide lightbox at outset to avoid flash on start
    lbClass: 'hidden',
    currIndex: 0, 
    nextShortTitle: 'not yet set',
    prevShortTitle: 'not yet set',
    mIndex: -1,
    mockups: [
     {
       "slug": "home",
       "svgy": 49,
       "svgx": 0,
       "title": "Home Page",
       "imageName": "01-home",
       "shortTitle": "Home Page"
     },
     {
       "slug": "citystory1",
       "svgy": 235,
       "svgx": 0,
       "title": "4 Cities / 4 Stories Menu - Default View",
       "imageName": "02-citystory-default",
       "shortTitle": "City/Story Menu"
     },
     {
       "slug": "citystory2",
       "svgy": 362,
       "svgx": 0,
       "title": "4 Cities / 4 Stories - City Story Tooltip (Reaction to Redevelopment)",
       "imageName": "03-citystory-citytheme-hover",
       "shortTitle": "City/Story Tooltip"
     },
     {
       "slug": "citystory3",
       "svgy": 488,
       "svgx": 0,
       "title": "4 Cities / 4 Stories - City Intro",
       "imageName": "04-citystory-city-intro",
       "shortTitle": "City Intro"
     },
     {
       "slug": "citystory4",
       "svgy": 614,
       "svgx": 0,
       "title": "4 Cities / 4 Stories - Theme Intro",
       "imageName": "05-citystory-theme-intro",
       "shortTitle": "Theme Intro"
     },
     {
       "slug": "sights-soundsx",
       "svgy": 488,
       "svgx": 135,
       "title": "[Sights & Sounds - City Menu]",
       "imageName": "06-sights-menu",
       "shortTitle": "City Menu"
     },
     {
       "slug": "sights-sounds",
       "svgy": 614,
       "svgx": 135,
       "title": "[Sights & Sounds - Sample Video]",
       "imageName": "06-sights-video",
       "shortTitle": "Stuy Town Video"
     },
     {
       "slug": "personal1",
       "svgy": 614,
       "svgx": 271,
       "title": "Personal Stories - Topic Menu",
       "imageName": "07-personal-stories-topics",
       "shortTitle": "Topic Menu"
     },
     {
       "slug": "personal2",
       "svgy": 741,
       "svgx": 271,
       "title": "Personal Stories - Story Page (Hunter's Pharmacy)",
       "imageName": "08-personal-stories-hunters",
       "shortTitle": "Story Page"
     },
     {
       "slug": "personal3",
       "svgy": 867,
       "svgx": 271,
       "title": "Personal Stories - City Menu",
       "imageName": "09-personal-stories-city-menu",
       "shortTitle": "City Menu"
     },
     {
       "slug": "personal4",
       "svgy": 994,
       "svgx": 271,
       "title": "Personal Stories - Albany Menu",
       "imageName": "10-personal-stories-albany-menu",
       "shortTitle": "Albany Menu"
     },
     {
       "slug": "personal5",
       "svgy": 1120,
       "svgx": 271,
       "title": "Personal Stories - City Menu ToolTip",
       "imageName": "11-personal-stories-albany-popup",
       "shortTitle": "City Menu Tooltip"
     },
     {
       "slug": "personal6",
       "svgy": 1245,
       "svgx": 271,
       "title": "Personal Stories - Brief Story",
       "imageName": "12-personal-stories-short-story",
       "shortTitle": "Brief Story"
     },
     {
       "slug": "personal7",
       "svgy": 1371,
       "svgx": 271,
       "title": "Personal Stories - Full Story",
       "imageName": "13-personal-stories-long-story",
       "shortTitle": "Full Story"
     },
     {
       "slug": "map1",
       "svgy": 211,
       "svgx": 738,
       "title": "[Interactive Map] - Map Menu",
       "imageName": "14- map-menu",
       "shortTitle": "Map Menu"
     },
     {
       "slug": "map2",
       "svgy": 332,
       "svgx": 738,
       "title": "[Interactive Map] (Albany's Lost Places)",
       "imageName": "14-map-neighborhood",
       "shortTitle": "Albany Map"
     },
     {
       "slug": "visuals1",
       "svgy": 332,
       "svgx": 886,
       "title": "The Visual Record - Default View",
       "imageName": "15-visuals-default",
       "shortTitle": "Default View"
     },
     {
       "slug": "visuals2",
       "svgy": 458,
       "svgx": 886,
       "title": "The Visual Record - Filters",
       "imageName": "16-visuals-filters",
       "shortTitle": "Filters Menu"
     },
     {
       "slug": "visuals3",
       "svgy": 583,
       "svgx": 886,
       "title": "The Visual Record - Filter Selections",
       "imageName": "17-visuals-filter-selections",
       "shortTitle": "Filter Selections"
     },
     {
       "slug": "visuals4",
       "svgy": 710,
       "svgx": 886,
       "title": "The Visual Record - Filter Results",
       "imageName": "18-visuals-filter-results",
       "shortTitle": "Filter Results"
     },
     {
       "slug": "visuals5",
       "svgy": 833,
       "svgx": 886,
       "title": "The Visual Record - Item Detail (South Pearl St. Shopping District)",
       "imageName": "19-visuals-item",
       "shortTitle": "Item Detail"
     },
     {
       "slug": "timeline1",
       "svgy": 832,
       "svgx": 1037,
       "title": "Timeline - Default View",
       "imageName": "20-timeline-default",
       "shortTitle": "Timeline"
     },
     {
       "slug": "timeline2",
       "svgy": 953,
       "svgx": 1037,
       "title": "Timeline - Event Popup",
       "imageName": "21-timeline-event-popup",
       "shortTitle": "Event Page"
     },
     {
       "slug": "theme1",
       "svgy": 1154,
       "svgx": 885,
       "title": "[Themes & Essays - Menu]",
       "imageName": "22-theme-menu",
       "shortTitle": "Theme Menu"
     },
     {
       "slug": "theme2",
       "svgy": 1283,
       "svgx": 885,
       "title": "[Themes & Essays - Theme Narrative] (Albany's Rooming Houses & SROs)",
       "imageName": "22-theme-narrative",
       "shortTitle": "Theme Narrative"
     }
    ],    // mockups: {
    //   "home": {"title":"Home Page","imageName":"01-home"},
    //   "citystory1": 
    //     {"title":"City/Story Menu","imageName":"02-citystory-default"}
    // },
    mockup: null
  },
  // created() {
  mounted() {

    // // run after everything is in-place
    // window.addEventListener('load', () => {

      // From: https://stackoverflow.com/questions/35914069/
      //   how-can-i-get-query-parameters-from-a-url-in-vue-js  
      let uri = window.location.href.split('?');
      if (uri.length == 2) {
        let vars = uri[1].split('&');
        let getVars = {};
        let tmp = '';
        vars.forEach(function(v){
          tmp = v.split('=');
          if(tmp.length == 2)
          getVars[tmp[0]] = tmp[1];
        });
        console.log(getVars);
        // do 
        this.mIndex = getVars.mindex
        // If mindex sent, open slimpop
        if (this.mIndex > -1) {
          this.openMockup(this.mIndex)
        }
      }
    // })

  },
  methods: {
    incrementMockup: function (nextOrPrev) {
      // console.log('got to changeMockup, nextOrPrev: ' + nextOrPrev)
      if (nextOrPrev === 'next') {
        // console.log('got to changeMockup, open: ' + (this.currIndex + 1))
        this.openMockup(this.currIndex + 1)
      } else {
        this.openMockup(this.currIndex - 1)
      }
    },
    openMockup: function (mockIndex) {
      // console.log('got to openMockup, mockIndex: ' + mockIndex)
      if (this.lbClass === 'hidden') {
        this.lbClass = 'lightbox'
      }
      // When mockIndex comes from a parameter it will be a string
      this.currIndex = Number(mockIndex)
      // console.log(' currIndex + 1: ' + (this.currIndex + 1))
      this.mockup = this.mockups[this.currIndex]
      if (this.mockupOn === false) {
        this.mockupOn = true
      }
      if (this.nextExists) {
        this.nextShortTitle = this.mockups[this.currIndex + 1].shortTitle
      }
      if (this.prevExists) {
        this.prevShortTitle = this.mockups[this.currIndex - 1].shortTitle
      }
    },
    closeMockup: function () {
        this.mockupOn = false
    }
  },
  computed: {
    nextExists () {
      if (this.currIndex < (this.mockups.length - 1)) {
        return true
      } else {
        return false
      }
    },
    prevExists () {
      if (this.currIndex > 0) {
        return true
      } else {
        return false
      }
    }
  },
});

// Mini vue app from conditional return from map demo

var demoApp = new Vue({
  el: '#mapdemo',
  data: {
    cameFromMockup: false,
  },
  created() {
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
      // console.log(getVars);
      const yesorno = getVars.mockup;
      // If y change cameFromMockup
      // console.log('yesorno: ' + yesorno);
      if (yesorno === 'y') {
        this.cameFromMockup = true;
      }
    }

  }

});

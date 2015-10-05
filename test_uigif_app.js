
if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

}

if (Meteor.isServer) {
var path = Meteor.npmRequire('path');
var fs = Meteor.npmRequire('fs');
//var Gifsocket = Meteor.npmRequire('gifsockets');
    /*
    FlowRouter.route('/', {
        name: "root",
        action: function(params, queryParams) {
            FlowRouter.render('Home');
            console.log("root");
        }
    });
    FlowRouter.route('/image.gif', {
        name: "image",
        action: function(params, queryParams) {
            console.log("image");
        }
    });
    */
    Picker.route('/image.gif', function(params, req, res, next) {
        console.log("image");
        res.writeHead(200, {
//            'zconnection': 'keep-alive',
            'Content-type': 'image/jpeg'
//            'ztransfer-encoding': 'chunked'
        });
        /*filePath = path.join("", 'one.png');
        console.log(filePath);
        fs.exists(filePath, function(exists){
            console.log( exists )
        });
        console.log(__meteor_bootstrap__.__dirname);
        console.log(path.resolve('.'));
        */
        var filePath = path.join(path.resolve('.').split('server')[0],'web.browser/app/img/one.png');
        console.log(filePath);
        //fs.exists(filePath, function(exists ){
          //  console.log( exists );
            //console.log( filePath );
            //if(exists)
                var data = fs.readFileSync(filePath);
                res.write(data);
            res.end();
        console.log('done');
        //});

    });

  Meteor.startup(function () {
    // code to run on server at startup
      /*
      var gifsocket = new Gifsocket({
        // #GIFSOCKET-DIMENSIONS
        width: 200,
        height: 200
      });
      */
  });
}

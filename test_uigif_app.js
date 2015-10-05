
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
    var Gifsocket = Meteor.npmRequire('gifsockets');
    var Gifencoder = Meteor.npmRequire('gif-encoder');
    var Pngjs = Meteor.npmRequire('png-js');

    var gifsocket = ServerSession.get('gifsocket');
    if(!gifsocket){
      gifsocket = new Gifsocket({
        // #GIFSOCKET-DIMENSIONS
        width: 200,
        height: 200
      });
    }
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
            'connection': 'keep-alive',
            'Content-type': 'image/gif',
            'transfer-encoding': 'chunked'
        });

        gifsocket.addListener(res);
        
        /*
        filePath = path.join("", 'one.png');
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

        //var data = fs.readFileSync(filePath);
        //res.write(data);
        //res.end();

        //console.log('done');
        //});

        Pngjs.decode(filePath, function(pixels) {
            console.log(pixels.length);
            // pixels is a 1d array (in rgba order) of decoded pixel data
            gifsocket.writeRgbaFrame(pixels, function wroteTextFrame () {
        // Send a no content response
                console.log('wrote frame1');
                filePath = path.join(path.resolve('.').split('server')[0],'web.browser/app/img/two.png');
                console.log(filePath);
                Pngjs.decode(filePath, function(pixels) {
                    console.log(pixels.length);
                    // pixels is a 1d array (in rgba order) of decoded pixel data
                    gifsocket.writeRgbaFrame(pixels, function wroteTextFrame () {
                // Send a no content response
                        res.writeHead(204);
                        res.end();
                        console.log('wrote frame2');
                    });
                });
            });
        });
    });

  Meteor.startup(function () {
    // code to run on server at startup
      
      
  });
}

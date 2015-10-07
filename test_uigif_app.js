if (Meteor.isClient) {
    // counter starts at 0
    //--- (remove the whole counter thingy)
    Session.setDefault('counter', 0);

    Template.hello.helpers({
        counter: function() {
            return Session.get('counter');
        }
    });

    Template.hello.events({
        'click button': function() {
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

    // store socket in session
    //??? is there a way to do this on client?
    var gifsocket = ServerSession.get('gifsocket');
    if (!gifsocket) {
        gifsocket = new Gifsocket({
            // #GIFSOCKET-DIMENSIONS
            width: 200,
            height: 200
        });
    }

    // need to handle a route as if this was not Meteor

    Picker.route('/image.gif', function(params, req, res, next) {
        console.log("image");
        res.writeHead(200, {
            'connection': 'keep-alive',
            'Content-type': 'image/gif',
            'transfer-encoding': 'chunked'
        });

        gifsocket.addListener(res); //!!! stored

        var filePath = path.join(path.resolve('.').split('server')[0], 'web.browser/app/img/one.png'); //??? ugh is there a better way to do this on meteor.com?
        console.log(filePath);

        Pngjs.decode(filePath, function(pixels) {
            console.log(pixels.length);
            // pixels is a 1d array (in rgba order) of decoded pixel data
            gifsocket.writeRgbaFrame(pixels, function wroteTextFrame() {
                // Send a no content response
                console.log('wrote frame1'); //--- remove comments
            });
        });
    });

    //+++ back, animations, and a third connect op

    Picker.route('/image2.gif', function(params, req, res, next) {
        console.log("image2");

        var filePath = path.join(path.resolve('.').split('server')[0], 'web.browser/app/img/two.png');
        console.log(filePath);

        Pngjs.decode(filePath, function(pixels) {
            console.log(pixels.length);
            gifsocket.writeRgbaFrame(pixels, function wroteTextFrame() {
                console.log('wrote frame2');
                // Send a no content response
                res.writeHead(204);
                res.end();
            });
        });
    });

    Meteor.startup(function() {
        // code to run on server at startup
    });
}

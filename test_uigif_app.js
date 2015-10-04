
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
var Gifsocket = Meteor.npmRequire('gifsockets');
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
});

  Meteor.startup(function () {
    // code to run on server at startup
      var gifsocket = new Gifsocket({
        // #GIFSOCKET-DIMENSIONS
        width: 200,
        height: 200
      });
  });
}

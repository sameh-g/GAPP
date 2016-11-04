var fs = require('fs');
var express = require('express');
var app = express();
var RSS = require('rss');
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose = require('mongoose');
 mongoose.connect('mongodb://localhost/weworked');
var Schema = mongoose.Schema;


 
mongoose.model('stories', new Schema({ fullName: String, 
  handle: String, website: String ,
  bio: String, avatar: String ,
  story: String, double: String 

}));
  var stories = mongoose.model('stories');


// Public directory for all static assets
app.use(express.static('public'));

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set views and jsx for view engine
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());
// use morgan to log requests to the console
app.use(morgan('dev'));


//Select all stories
app.get('/', function(req, res) 
{
    var data ;
    stories.find({}, function(err, data) {
    var _data=JSON.stringify(data);
    _data=JSON.parse(_data);
    console.log("DATA",_data)
    res.render('index', { title: "They Worked with Us.", stories: _data.reverse() });
});

});

//Delete All stories.. 
app.get('/RemoveAllStories', function(req, res) 
{
stories.remove().exec();
res.send('sucess');

});

//Insert story.. 
app.post('/AddStory', function(req, res) {

console.log('AddStory Request fullname',req.param('fullname'));
  stories.create(
    { fullName: req.param('fullname') ,
      handle: req.param('handle'), 
      website: req.param('website') ,
      bio: req.param('fullname'), 
      avatar:req.param('avatar') ,
      story: req.param('story'), 
      double:req.param('double')


}
    , function (err, small) {
  if (err) return handleError(err);
  console.log('new Story saved')
})


        res.send('posted successfuly');
   

  });



var server = app.listen(5090, function () {
  console.log('Listening at http://localhost:5090');
});

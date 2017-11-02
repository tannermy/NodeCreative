var express = require('express');
var router = express.Router();
var request = require('request');

var chats = [
    {author: 'Tanner',
    text: 'Definitely Hot'},
    {author: 'Some Guy',
    text: 'Cold all the way'}];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('index.html', { root: 'public' });
});

router.get('/chats', function(req, res) {
  console.log("In Chats");
  res.send(chats);
});

router.post('/chats', function(req, res) {
    console.log("In Chats Post");
    console.log(req.body);
    chats.push(req.body);
    res.end('{"success" : "Updated Successfully", "status" : 200}');
});

router.delete('/chats/:chat_text/:chat_author', function(req, res) {
  console.log("Deleting post");
  chats.remove({ author: chat_author,
       text: req.params.chat_text}, function(err) {
        if (!err) {
            return res.send('Post deleted!');
        } else {
            return res.send('Error deleting post!');
        }
    });

});

module.exports = router;

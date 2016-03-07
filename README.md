Description
=======
[Block Overhead](http://www.blockoverhead.com "Block Overhead") is a (lightly) fighting game themed clone of Stack Overflow. It is a Backbone.js app consuming a RESTful Rails API.

Highlights
======
Unanswered Questions, Questions with a certain tag, and searching are all implemented using custom AJAX requests. The rails controller action for searching uses the pg_search gem, but will redirect to '/questions/tagged/:tag_name' if the exact name of a tag is searched.

The text fields for creating questions and answers implement a markdown editor created using Pagedown, with a custom javascript hook for uploading images to Amazon S3 and embedding them in the post. Text is stored in the database as written, and converted to HTML at render time.

The backbone views are generated using a straightforward nesting strategy, with some care taken to reduce extraneous loads.

Future Features
==========
Most of the things we would like to see are better ways of looking at data. Advanced sorting of questions, a 'my tags' view, etc.

The main other feature to come is notifications, both instantly the navbar and by email. Also, the addition of moderator accounts would be necessary to support any kind of active userbase.

Finally, one small fix would be to ensure Pagedown respects line breaks more consistently, and doesn't purge inline html tags used to do something like embed a video.

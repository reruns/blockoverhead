this is a holding pen for near-future stuff so I don't forget

Backbone stuff:  
  Update index item templates to have a little more information
  figure out why the answer edit button doesn't appear until refresh?

  make it so that opening edit on a question closes the other ones?
    Just have an upper-level thing tracking the currently open edit.
    When an edit button gets pressed, just boop out the existing one the normal way.
    If necessary, call a special method that remove()s it without really submitting.
    Call the markdown code in the router after rendering.

  file uploads
  search
  Sorting questions  
  Styles!

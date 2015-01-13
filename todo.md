this is a holding pen for near-future stuff so I don't forget

Backbone stuff:  
  Update index item templates to have a little more information

  file uploads (user avatars)
  In-post file uploading
    In the hook for adding an image, pop up a modal filepicker dialog
    use the same magic we use with paperclip to send it up to S3
    in the success callback, get back the URL, and pass that to the callback
    of the hook, which will paste in the correct URL for us.
  search + pagination
  Sorting questions  
  Styles!

this is a holding pen for near-future stuff so I don't forget

Backbone stuff:
  hopeful schedule ahaha

  add a cancel button to edit forms (duh)

  WED:
  In-post file uploading
    In the hook for adding an image, pop up a modal filepicker dialog
      have a view for this
      make an asset model
    use the same magic we use with paperclip to send it up to S3
    in the success callback, get back the URL, and pass that to the callback
    of the hook, which will paste in the correct URL for us.

  THUR:
  search + pagination
  Sorting questions  

  FRI:
  Update index item templates to have a little more information
  Styles!

json.extract! @comment, :id, :body

json.created_at @comment.created_at.strftime('%H:%M:%S %m/%d/%Y')

json.author @comment.author

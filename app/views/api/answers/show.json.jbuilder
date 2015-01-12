json.extract! @answer, :id, :body, :score

json.user do
  json.extract! @answer.user, :id, :username
end

json.comments do
  json.array! @answer.comments do |comment|
    json.extract! comment, :id, :body, :created_at
    json.author do
      json.extract! comment.author, :id, :username
    end
  end
end

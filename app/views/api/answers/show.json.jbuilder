json.extract! @answer, :id, :body, :score, :accepted

json.created_at @answer.created_at.strftime('%H:%M:%S %m/%d/%Y')

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

json.question do
  json.extract! @answer.question, :id, :title, :body, :created_at
  json.author do
    json.extract! @answer.question.user, :id
  end
end

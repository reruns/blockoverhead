json.extract! @question, :title, :body, :score, :view_count, :created_at

json.tags do
  json.array! @question.tags do |tag|
    json.extract! tag, :id, :title
  end
end

json.user do
  json.extract! @question.user, :id, :username
end

json.comments do
  json.array! @question.comments do |comment|
    json.extract! comment, :id, :body, :created_at
    json.author do
      json.extract! comment.author, :id, :username
    end
  end
end

json.answers do
  json.array! @question.answers do |answer|
    json.extract! answer, :id, :body

    json.user do
      json.extract! answer.user, :id, :username
    end

    json.comments do
      json.array! answer.comments do |comment|
        json.extract! comment, :id, :body, :created_at
        json.author do
          json.extract! comment.author, :id, :username
        end
      end
    end
  end
end

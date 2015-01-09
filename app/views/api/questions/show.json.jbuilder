json.extract! @question, :title, :body, :score, :view_count, :created_at

json.tags do
  json.array! @question.tags do |tag|
    json.extract! tag, :id, :title
  end
end

json.user do
  json.extract! @question.user, :id, :name
end

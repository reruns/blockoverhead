json.extract! @tag, :title

if @tag.tagged_questions
  json.questions do
    json.array! @tag.tagged_questions do |question|
      json.extract! question, :id, :title
    end
  end
end

if @tag.tagged_users
  json.users do
    json.array! @tag.tagged_users do |user|
      json.extract! user, :id, :title
    end
  end
end

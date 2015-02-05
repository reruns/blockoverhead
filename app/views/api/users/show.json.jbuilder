json.extract! @user, :username, :location

json.created_at @user.created_at.strftime('%d %B %Y')

if @user.tags
  json.tags do
    json.array! @user.tags do |tag|
      json.extract! tag, :id, :title
    end
  end
end

if @user.questions
  json.questions do
    json.array! @user.questions do |question|
      json.extract! question, :id, :title, :score, :view_count
    end
  end
end

if @user.answers
  json.answers do
    json.array! @user.answers do |answer|
      json.extract! answer, :score
      json.extract! answer.question, :id, :title, :view_count
    end
  end
end

if @user.avatar
  json.avatar asset_path(@user.avatar.url)
end

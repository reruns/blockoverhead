json.extract! @user, :name, :location, :created_at

if @user.tags
  json.tags do
    json.array! @user.tags do |tag|
      json.extract! tag, :id, :title
    end
  end
end

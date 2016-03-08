json.models do
  json.array! @users do |user|
    json.extract! user, :id, :username

    if user.avatar
      json.avatar asset_path(user.avatar.url)
    else
      json.avatar image_path('default_av.png')
    end
  end
end

json.page @page
json.total_pages @users.total_pages

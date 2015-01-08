module QuestionsHelper
  def require_tag(tags)
    if tags =~ /^\s*$/
      flash.now[:errors] = ["Must have at least one tag"]
      return false
    end
    true
  end
end

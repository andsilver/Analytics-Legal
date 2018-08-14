class MenuTemplate < ApplicationRecord
  has_many :menus, dependent: :delete_all

  DEFAULT_MENUS = ["summary", "cases", "notifications", "zeus", "deep_graph", "deep_search", "predict", "admin"].freeze()
end

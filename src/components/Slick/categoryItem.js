import React from "react";

const CategoryItem = (props) => {
  const { category, filterMenu, activeId } = props;
  return (
    <div
      className={activeId === category.id ? "active" : ""}
      onClick={() => {
        filterMenu(category.menu_id, category.id, category.name);
      }}
    >
      {category.name}
    </div>
  );
};
export default CategoryItem;

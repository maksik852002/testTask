export const apiURL = "http://localhost:8000";

export const links = [
  {path: '/adm/users', name: 'Users'},
  {path: '/adm/articles', name: 'Articles'},
  {path: '/adm/categories', name: 'Categories'},
];

export const defaultAvatar =
  "https://www.unipulse.tokyo/en/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png";
  
export const columns = [
  { id: "title", label: "Title", width: "calc((100% - 0px) / 2)" },
  { id: "category", label: "Category", width: "calc((100% - 0px) / 4)" },
  {
    id: "createdBy",
    label: "Created by",
    width: "calc((100% - 0px) / 4)",
  },
  {
    id: "actions",
    label: "Actions",
  },
];
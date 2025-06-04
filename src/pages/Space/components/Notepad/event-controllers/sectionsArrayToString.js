const typeToTag = {
  bullet: "<bul>",
  paragraph: "<par>",
  numbered: "<num>",
  header: "<h>",
};

export const sectionsToString = (sections) => {
  const result = sections
    .map((item) => {
      const tag = typeToTag[item.type] || "";
      return tag + item.content;
    })
    .join("");

  return result;
};

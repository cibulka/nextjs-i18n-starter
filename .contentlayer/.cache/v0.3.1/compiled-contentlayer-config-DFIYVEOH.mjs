// contentlayer.config.ts
import { makeSource } from "contentlayer/source-files";

// lib/contentlayer/types/page.ts
import { defineDocumentType } from "contentlayer/source-files";

// lib/contentlayer/utils/index.ts
import path from "path";
function getSlugAndLocale(post) {
  const result = path.basename(post._raw.sourceFileName, ".mdx").split(".").filter(Boolean);
  if (result.length !== 2)
    throw new Error("NOPE");
  return result;
}
function computeLocaleData(dir) {
  return {
    locale: {
      type: "string",
      resolve: (post) => {
        const [, locale] = getSlugAndLocale(post);
        return locale;
      }
    },
    slug: {
      type: "string",
      resolve: (post) => {
        const [slug] = getSlugAndLocale(post);
        return slug;
      }
    },
    url: {
      type: "string",
      resolve: (post) => {
        const [slug, locale] = getSlugAndLocale(post);
        if (dir === "pages") {
          return `/${locale}/${slug}`;
        }
        return `/${locale}/${dir}/${slug}`;
      }
    }
  };
}

// lib/contentlayer/types/page.ts
var DIR = "pages";
var Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `${DIR}/*/*.mdx`,
  contentType: "mdx",
  fields: {
    order: {
      type: "number"
    },
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    }
  },
  computedFields: {
    ...computeLocaleData(DIR)
  }
}));

// contentlayer.config.ts
var contentlayer_config_default = makeSource({
  contentDirExclude: [".DS_Store"],
  contentDirPath: "content",
  documentTypes: [
    Page
  ]
});
export {
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-DFIYVEOH.mjs.map

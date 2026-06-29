import { defineField } from "sanity";
import { imageAltWarning } from "./validation";

type ImageFieldOptions = {
  name: string;
  title: string;
  description?: string;
};

export const imageWithAltField = ({ name, title, description }: ImageFieldOptions) =>
  defineField({
    name,
    title,
    type: "image",
    group: "media",
    options: {
      hotspot: true,
    },
    fields: [
      defineField({
        name: "alt",
        title: "圖片替代文字",
        type: "string",
        description: "請描述圖片內容，例如：1201 地中海豪華雙人房床區。",
        validation: imageAltWarning,
      }),
      defineField({
        name: "caption",
        title: "圖片說明",
        type: "string",
        description: "選填，供後台辨識用途；不一定會顯示在網站上。",
      }),
    ],
    description,
  });

export const imageGalleryField = ({ name, title, description }: ImageFieldOptions) =>
  defineField({
    name,
    title,
    type: "array",
    group: "media",
    of: [
      {
        type: "image",
        options: { hotspot: true },
        fields: [
          defineField({
            name: "alt",
            title: "圖片替代文字",
            type: "string",
            validation: imageAltWarning,
          }),
          defineField({
            name: "caption",
            title: "圖片說明",
            type: "string",
          }),
        ],
      },
    ],
    description,
  });

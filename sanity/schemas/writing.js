export default {
  name: 'writing',
  title: 'Writing',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'href',
      title: 'Href',
      type: 'url',
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'date',
    },
  ],
}

export default {
  name: 'modelomics',
  title: 'Modelomics',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    },
    {
      name: 'heroSummary',
      title: 'Hero Summary',
      type: 'text',
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
    },
    {
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'readingPathTitle',
      title: 'Reading Path Title',
      type: 'string',
    },
    {
      name: 'readingPathDescription',
      title: 'Reading Path Description',
      type: 'text',
    },
    {
      name: 'readingSteps',
      title: 'Reading Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'sectionCards',
      title: 'Section Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'count', title: 'Count', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'summary', title: 'Summary', type: 'text' },
            { name: 'href', title: 'Href', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'category', title: 'Category', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'summary', title: 'Summary', type: 'text' },
            { name: 'href', title: 'Href', type: 'url' },
          ],
        },
      ],
    },
    {
      name: 'footerNote',
      title: 'Footer Note',
      type: 'string',
    },
    {
      name: 'featuredProjects',
      title: 'Featured Projects',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'project' } }],
    },
  ],
}

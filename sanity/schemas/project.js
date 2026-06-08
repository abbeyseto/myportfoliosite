export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'Title of the project',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
    },
    {
      name: 'challenge',
      title: 'Challenge',
      type: 'text',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
    {
      name: 'outcome',
      title: 'Outcome',
      type: 'text',
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: { type: 'skill'}}]
    },
    {
      name: 'linkToBuild',
      title: 'LinkToBuild',
      type: 'url',
    },
  ],
}

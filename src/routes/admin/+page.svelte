<script lang="ts">
  import CMS from '@sveltia/cms';

  CMS.init({
    config: {
      load_config_file: false,
      media_folder: 'src/lib/media',
      backend: {
        name: 'gitea',
        app_id: 'a046b53c-787a-4b76-bd3a-633221a38954',
        repo: 'repomaa/cv',
      },
      collections: [
        {
          name: 'profile',
          label: 'Profile',
          format: 'json',
          files: [
            {
              name: 'profile',
              label: 'Profile',
              file: 'src/lib/content/profile.json',
              fields: [
                { name: 'name', label: 'Name', widget: 'string' },
                { name: 'title', label: 'Title', widget: 'string' },
                { name: 'email', label: 'Email', widget: 'string' },
                { name: 'phone', label: 'Phone', widget: 'string', required: false },
                { name: 'location', label: 'Location', widget: 'string' },
                { name: 'website', label: 'Website', widget: 'string', required: false },
                { name: 'github', label: 'GitHub', widget: 'string' },
                { name: 'summary', label: 'Summary', widget: 'text' },
              ],
            },
          ],
        },
        {
          name: 'experience',
          label: 'Experience',
          format: 'json',
          folder: 'src/lib/content/experience',
          fields: [
            { name: 'company', label: 'Company', widget: 'string' },
            { name: 'position', label: 'Position', widget: 'string' },
            { name: 'location', label: 'Location', widget: 'string', required: false },
            { name: 'startDate', label: 'Start Date', widget: 'datetime', time_format: false },
            {
              name: 'endDate',
              label: 'End Date',
              widget: 'datetime',
              time_format: false,
              required: false,
            },
            { name: 'description', label: 'Description', widget: 'markdown' },
            {
              name: 'technologies',
              label: 'Technologies',
              widget: 'list',
              field: { label: 'Technology', widget: 'string' },
            },
          ],
        },
        {
          name: 'education',
          label: 'Education',
          format: 'json',
          folder: 'src/lib/content/education',
          fields: [
            { name: 'institution', label: 'Institution', widget: 'string' },
            { name: 'degree', label: 'Degree', widget: 'string' },
            { name: 'field', label: 'Field', widget: 'string', required: false },
            { name: 'location', label: 'Location', widget: 'string', required: false },
            { name: 'startDate', label: 'Start Date', widget: 'datetime', time_format: false },
            {
              name: 'endDate',
              label: 'End Date',
              widget: 'datetime',
              time_format: false,
              required: false,
            },
            { name: 'description', label: 'Description', widget: 'markdown', required: false },
          ],
        },
        {
          name: 'skills',
          label: 'Skills',
          format: 'json',
          folder: 'src/lib/content/skills',
          fields: [
            { name: 'category', label: 'Category', widget: 'string' },
            {
              name: 'items',
              label: 'Skills',
              widget: 'list',
              field: { label: 'Skill', widget: 'string' },
            },
          ],
        },
      ],
    },
  });
</script>

<svelte:head>
  <title>Content Manager</title>
</svelte:head>

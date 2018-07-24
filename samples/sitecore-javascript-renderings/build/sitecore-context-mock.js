export function mockContext(request) {
  return {
    pageEditing: false,
    item: {
      id: '9744bc44-d4ad-45de-951c-e63454a1a8da',
      name: 'MixedMode',
      displayName: 'MixedMode',
      version: 1,
      database: 'master',
      language: 'en',
      templateId: '76036f5e-cbce-46d1-af0a-4143f9b557aa',
      templateName: 'Sample Item',
      fields: {
        Text: {
          value: '<p>I was rendered by xslt.</p>',
          editable: '<p>I was rendered by xslt.</p>',
        },
        Title: {
          value: 'MixedMode',
          editable: 'MixedMode',
        },
      },
    },
    site: {
      name: 'website',
    },
    device: {
      id: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      name: 'Default',
    },
  };
}

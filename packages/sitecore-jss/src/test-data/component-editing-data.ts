// default setup for placeholder-less component
const contentBlock = {
  uid: 'test-content',
  componentName: 'ContentBlock',
  dataSource: '{FC218D50-FC56-5B2B-99BA-38D570A83386}',
  params: {
    nine: 'nine',
  },
  fields: {
    content: {
      value: '<p>This is a live set of examples of how to use JSS</p>\r\n',
    },
    heading: {
      value: 'JSS Styleguide',
    },
  },
  placeholders: {
    inner: [
      {
        uid: 'test-inner',
        componentName: 'InnerBlock',
        fields: {
          text: {
            value: 'Its an inner component',
          },
        },
      },
    ],
  },
};

export default contentBlock;

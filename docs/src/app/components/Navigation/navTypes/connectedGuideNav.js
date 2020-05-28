const connectedGuideNav = {
  url: 'connected-demo',
  displayName: 'Connected Demo',
  children: [
    {
      url: 'getting-started',
      displayName: 'Getting Started',
      children: [
        {
          url: 'prerequisites',
          displayName: 'Prerequisites',
        },
        {
          url: 'repository',
          displayName: 'Cloning repository',
        },
        {
          url: 'connecting',
          displayName: 'Connecting to Sitecore',
        }
      ]
    },
    {
      url: 'explore-sitecore',
      displayName: 'Exploring Sitecore',
      children: [
        {
          url: 'experience-editor',
          displayName: 'Experience Editor',
        },
        {
          url: 'personalization-in-experience-editor',
          displayName: 'Personalization',
        },
        {
          url: 'xprofile',
          displayName: 'Generating Data for xProfile',
        },
        {
          url: 'launch-xprofile',
          displayName: 'Launching xProfile',
        }
      ]
    },
    {
      url: 'explore-code',
      displayName: 'Exploring Code',
      children: [
        {
          url: 'updating-component',
          displayName: 'Updating a Component',
        },
        {
          url: 'graphql',
          displayName: 'GraphQL',
        }
      ]
    },
  ],
  links: []
};

export default connectedGuideNav;

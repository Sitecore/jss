export default manifest => {
  manifest.addTemplate({
    name: "TitleDescription",
    icon: "People/16x16/alarmclock.png",
    defaultWorkflow: "/sitecore/system/Workflows/Sample Workflow",
    fields: [
      {
        name: "title",
        displayName: "Title",
        type: manifest.fieldTypes.singleLineText,
        sortOrder: 1000,
        standardValue: "$name",
        section: "Title Description",
        required: true,
        validationPattern: "^[A-Za-z ]+$",
        validationMessage: "Use only letters and spaces in the title."
      },
      {
        name: "description",
        displayName: "Description",
        type: manifest.fieldTypes.richText,
        sortOrder: 2000,
        section: "Title Description"
      },
      {
        name: "shared",
        // custom field types can be specified as strings
        type: "Name Value List",
        storage: "shared", // shared, unversioned, versioned (versioned is default); do not change after imported
        source: "/sitecore/content"
      }
    ]
  });
};

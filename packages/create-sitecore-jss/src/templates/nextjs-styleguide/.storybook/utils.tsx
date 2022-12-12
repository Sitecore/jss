import React from 'react';
import {
  SitecoreContext,
  ComponentRendering,
  Item,
  Field,
} from '@sitecore-jss/sitecore-jss-nextjs';

type ValueType = string | number | boolean | { [key: string]: unknown };

export type FieldType = ValueType | Item | Item[] | Field | undefined;

type FlattenFields<Fields extends { [key: string]: any }, ExcludeKeys> = {
  [field in keyof Fields]: field extends ExcludeKeys ? Fields[field] : Fields[field]['value'];
};

/**
 * @param {Args} Storybook args
 * @param {ExcludeKeys} Keys to be skipped during falttening
 */
export type StorybookArgs<
  Args extends { [key: string]: any },
  ExcludeKeys extends keyof Args['fields'] = ''
> = Omit<Args, 'fields'> & {
  fields: FlattenFields<Args['fields'], ExcludeKeys>;
};

type Props = {
  [key: string]: unknown;
  fields: { [key: string]: FieldType };
  rendering?: ComponentRendering;
};

export const withFields = <Args extends Props, ReturnType>(props: Args): ReturnType => {
  const transformFields = (fields: Props['fields']) => {
    Object.keys(fields).forEach((fieldName) => {
      const field = fields[fieldName];

      if (Array.isArray(field)) {
        return;
      } else {
        if (typeof field === 'object') {
          return;
        } else {
          // Single value
          fields[fieldName] = { value: field } as any;
        }
      }
    });
  };

  transformFields(props.fields);

  if (props.rendering?.fields) {
    transformFields(props.rendering?.fields);
  }

  return (props as unknown) as ReturnType;
};

const defaultLayoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      site: {
        name: 'nextjs-app',
      },
      language: 'en',
      itemPath: '/',
    },
    route: {
      name: 'home',
      displayName: 'home',
      fields: {
        pageTitle: {
          value: 'Welcome to Sitecore JSS',
        },
        headLine: {
          value: 'Welcome to Sitecore JSS',
        },
        author: {
          value: 'Sitecore',
        },
        content: {
          value: 'Welcome to Sitecore JSS',
        },
      },
      databaseName: 'master',
      deviceId: 'fe5d7fdf-89c0-4d99-9aa3-b5fbd009c9f3',
      itemId: '45be1451-fa83-5f80-9f0d-d7457b480b58',
      itemLanguage: 'en',
      itemVersion: 1,
      layoutId: '1db67245-f673-5e7f-9726-e7c5e76350f1',
      templateId: '787584c0-a057-5876-9836-f8b3708f0caf',
      templateName: 'App Route',
      placeholders: {},
    },
  },
};

const components = new Map();
const defaultComponentFactory = (name: string) => components.get(name);

export const withSitecoreContext = ({
  layoutData = defaultLayoutData,
  componentFactory = defaultComponentFactory,
} = {}) => (Story: React.FC) => (
  <SitecoreContext componentFactory={componentFactory} layoutData={layoutData}>
    <Story />
  </SitecoreContext>
);

// type ValueType = string | number | boolean;

// export type FieldType = ValueType | Item | Item[] | Field;

// export const withFields = <Args extends Props, ReturnType>(props: Args): ReturnType => {
//   const transformFields = (fields: Props['fields']) => {
//     // debugger;
//     Object.keys(fields).forEach((fieldName) => {
//       const field = fields[fieldName];

//       if (Array.isArray(field)) {
//         field.forEach((_, index) => {
//           transformFields(field[index].fields as Props['fields']);
//         });
//       } else {
//         if (typeof field === 'object') {
//           const item = field;

//           if ((item as Field).value) return;

//           // Iterate fields
//           Object.keys((item as Item).fields).forEach((key) => {
//             let field = (item as Item).fields[key];

//             // Value is provided
//             if ((field as Field).value) return;

//             // Array of fields
//             if (Array.isArray(field)) {
//               field.forEach((_, index) => {
//                 transformFields((field as Item[])[index].fields as Props['fields']);
//               });

//               return;
//             }

//             // Nested fields in item
//             if ((field as Item).fields) {
//               transformFields((field as Item).fields as Props['fields']);
//             } else {
//               // Single value
//               field = { value: field } as any;
//             }
//           });
//         } else {
//           // Single value
//           fields[fieldName] = { value: field } as any;
//         }
//       }
//     });
//   };

//   transformFields(props.fields);

//   if (props.rendering?.fields) {
//     transformFields(props.rendering?.fields);
//   }

//   console.log(props);

//   return props as unknown as ReturnType;
// };

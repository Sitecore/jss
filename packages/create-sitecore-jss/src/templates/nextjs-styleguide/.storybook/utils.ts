import { ComponentRendering, Item, Field } from '@sitecore-jss/sitecore-jss-nextjs';

type ValueType = string | number | boolean | { [key: string]: unknown };

export type FieldType = ValueType | Item | Item[] | Field | undefined;

export type ValueFields<
  Fields extends { [key: string]: any },
  ExcludeKeys extends keyof Fields = ''
> = {
  [field in keyof Fields]: field extends ExcludeKeys ? Fields[field] : Fields[field]['value'];
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

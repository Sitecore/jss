import {
  GraphQLDictionaryQueryResponse,
  GraphQLEditingQueryResponse,
} from '../editing/graphql-editing-service';
import { EditMode } from '../layout';

export const mockEditingServiceResponse = (
  hasNext = false
): { data: GraphQLEditingQueryResponse } => ({
  data: {
    item: {
      rendered: {
        sitecore: {
          context: {
            editMode: EditMode.Metadata,
            pageEditing: true,
            language: 'en',
          },
          route: {
            name: 'Sample',
            placeholders: {
              main: [
                {
                  componentName: 'Sample',
                  fields: {
                    title: {
                      value: 'Hello world!',
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
    site: {
      siteInfo: {
        dictionary: {
          results: [
            {
              key: 'foo',
              value: 'foo-phrase',
            },
            {
              key: 'bar',
              value: 'bar-phrase',
            },
          ],
          pageInfo: {
            hasNext,
            endCursor: hasNext ? 'cursor' : '',
          },
        },
      },
    },
  },
});

export const mockEditingServiceDictionaryResponse: {
  [key: string]: { data: GraphQLDictionaryQueryResponse };
} = {
  pageOne: {
    data: {
      site: {
        siteInfo: {
          dictionary: {
            results: [
              {
                key: 'foo-one',
                value: 'foo-one-phrase',
              },
              {
                key: 'bar-one',
                value: 'bar-one-phrase',
              },
            ],
            pageInfo: {
              hasNext: true,
              endCursor: 'cursor-one',
            },
          },
        },
      },
    },
  },
  pageTwo: {
    data: {
      site: {
        siteInfo: {
          dictionary: {
            results: [
              {
                key: 'foo-two',
                value: 'foo-two-phrase',
              },
              {
                key: 'bar-two',
                value: 'bar-two-phrase',
              },
            ],
            pageInfo: {
              hasNext: false,
              endCursor: '',
            },
          },
        },
      },
    },
  },
};

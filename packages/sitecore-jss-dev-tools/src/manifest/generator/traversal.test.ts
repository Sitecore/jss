import {
  traverseItems,
  traverseAllItems,
  traverseAllFields,
  traverseAllRenderings
} from './traversal';
import sinon from 'sinon';
import { expect } from 'chai';

// traverseAllItems,
// traverseAllFields,
// traverseAllRenderings,

describe('traversal', () => {

    afterEach(() => {
        sinon.restore();
      });

  it('traverseItems should recursively process items', () => {
    const mockItems = [
      {
        name: 'home',
        children: [
          {
            name: 'sample',
            children: [
              {
                name: 'child',
              },
            ],
          },
        ],
      },
    ];

    const cbMock = sinon.stub();

    traverseItems(mockItems, cbMock);

    expect(cbMock.getCall(0).calledWith(
        mockItems[0], 
        'home'))
    .to.be.true;
    expect(cbMock.getCall(1).calledWith(
        mockItems[0].children[0], 
        'home/sample'))
    .to.be.true;
    expect(cbMock.getCall(2).calledWith(
        mockItems[0].children[0].children[0], 
        'home/sample/child'))
    .to.be.true;
  });
    it('traverseAllItems should process items children and related item from fields', () => {
        const mockMultiList = [
            {
                id: 'GUIDGUID',
                name: 'beloved aunt',
            },
            {
                id: 'GUIDGUID',
                name: 'beloved grandpa',
            }
        ];
        
        const mockFields = [
            {
                name: 'oneRelative',
                value: {
                    id: 'GUIDGUID',
                    name: 'homes long lost uncle',
                },
            },
            {
                name: 'otherRelatives',
                value: mockMultiList,
            }
          ];
          const mockRenderings = [
            {
                dataSource: {
                    id: 'GUIDGUID',
                    name: 'dSource'
                }
            }
        ];
        
        const mockItems = [
            {
              name: 'home',
              fields: mockFields,
              layout: {
                renderings: mockRenderings,
              },
              children: [
                {
                  name: 'sample',
                },
              ],
            },
          ];


        const cbStub = sinon.stub();

          traverseAllItems(mockItems, cbStub);

          expect(cbStub.calledWith(mockItems[0],'item')).to.be.true;
          expect(cbStub.calledWith(mockItems[0].children[0],'item')).to.be.true;
          expect(cbStub.calledWith(mockFields[0].value,'item')).to.be.true;
          expect(cbStub.calledWith(mockMultiList[0],'item')).to.be.true;
          expect(cbStub.calledWith(mockMultiList[1],'item')).to.be.true;
          expect(cbStub.calledWith(mockRenderings[0].dataSource,'datasource')).to.be.true;
    });

    it('traverseAllFields should use callback for fields', () => {
        const mockFields = [
            {
                name: 'oneRelative',
                value: {
                    id: 'GUIDGUID',
                    name: 'homes long lost uncle',
                },
            },
            {
                name: 'otherRelatives',
                value: 'list goes here',
            }
          ];
        
        const mockItems = [
            {
              name: 'home',
              fields: mockFields,           
            },
          ];

          const cbStub = sinon.stub();

          traverseAllFields(mockItems, cbStub);

          expect(cbStub.calledWith(mockFields[0]));
          expect(cbStub.calledWith(mockFields[1]));        
    });

    it('traverseAllRenderings should use callback for renderings', () => {
        const mockRenderings = [
            {
                dataSource: {
                    id: 'GUIDGUID',
                    name: 'dSource'
                }
            },
            {
                name: 'postrender'
            }
        ];
        
        const mockItems = [
            {
              name: 'home',
              fields: [],
              layout: {
                renderings: mockRenderings,
              },
              children: [
                {
                  name: 'sample',
                },
              ],
            },
          ];

          const cbStub = sinon.stub();

          traverseAllRenderings(mockItems, cbStub);

          expect(cbStub.calledWith(mockRenderings[0], mockItems[0]));
          expect(cbStub.calledWith(mockRenderings[1], mockItems[0]));    

    });
});

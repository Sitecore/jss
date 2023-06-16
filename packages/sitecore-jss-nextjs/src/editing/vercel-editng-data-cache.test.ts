/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { expect } from 'chai';
import * as vercelKv from '@vercel/kv';
import sinon from 'sinon';
import { EditingData } from './editing-data';
import { VercelEditingDataCache } from './vercel-editng-data-cache';

describe('verecel editing data cache', () => {

    function setup() {
        const kvStub: vercelKv.VercelKV = new vercelKv.VercelKV({
            url: 'test',
            token: 'test'
        });
        kvStub.set = sinon.stub();
        kvStub.get = sinon.stub();
        kvStub.expire = sinon.stub();
        sinon.stub(vercelKv, 'createClient').returns(kvStub);
        return kvStub;
    }

    afterEach(() => {
        sinon.reset();
    });

    it('should put entries into storage', async () => {
        const kvStub = setup();
        const key = 'top-secret';
        const entry = `{
            path: 'c:/rome',
            language: 'en',
            layoutData: {
                sitecore: {
                    route: null,
                    context: {}
                }
            }
        }`;
        const expectedResult: EditingData = {
            path: 'c:/rome',
            language: 'en',
            layoutData: {
                sitecore: {
                    route: null,
                    context: {}
                }
            },
            dictionary: {

            }
        };
        kvStub.get = sinon.stub().withArgs(key).resolves(entry);
        const result = await new VercelEditingDataCache('test', 'tset').get(key);

        expect(result).to.deep.equal(expectedResult);
    });

    xit('should get entries into storage', async () => {

    });

    xit('should put entries into storage with ttl', async () => {

    });

    xit('should return undefined on cache miss', async () => {

    });
});
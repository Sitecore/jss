import { expect } from 'chai';

import { JssFormData } from './JssFormData';

describe('JssFormData', () => {
	it('should append key/value', () => {
		const formData = new JssFormData();

		formData.append('xxx', 'val-xxx');
		formData.append('xxx', 'val-xxx');
		formData.append('yyy', 'val-yyy');

		expect(formData.get()).to.deep.equal([
			{ key: 'xxx', value: 'val-xxx' },
			{ key: 'xxx', value: 'val-xxx' },
			{ key: 'yyy', value: 'val-yyy' },
		]);
	});

	it('should set key/value', () => {
		const formData = new JssFormData();

		formData.set('xxx', 'val-xxx');
		formData.set('xxx', 'val-xxx');
		formData.set('yyy', 'val-yyy');
		formData.set('yyy', 'val-yyy');

		expect(formData.get()).to.deep.equal([
			{ key: 'xxx', value: 'val-xxx' },
			{ key: 'yyy', value: 'val-yyy' },
		]);
	});

	it('should merge overwriting existing values', () => {
		const x1formData = new JssFormData();
		const x1 = {
			a1: 'a1-val',
			a2: 'a2-val',
		};

		x1formData.mergeOverwritingExisting(x1);

		expect(x1formData.get()).to.deep.equal([
			{ key: 'a1', value: 'a1-val' },
			{ key: 'a2', value: 'a2-val' },
		]);

		const x2formData = new JssFormData();
		const x2 = {
			x21: 'a1-val',
			x22: 'a2-val',
			x23: [
				'x231-arr-val',
				'x232-arr-val',
				'x233-arr-val',
			],
		};

		x2formData.mergeOverwritingExisting(x2);

		expect(x2formData.get()).to.deep.equal([
			{ key: 'x21', value: 'a1-val' },
			{ key: 'x22', value: 'a2-val' },
			{ key: 'x23', value: 'x231-arr-val' },
			{ key: 'x23', value: 'x232-arr-val' },
			{ key: 'x23', value: 'x233-arr-val' },
		]);
	});

	it('should convert data to url encoded form data', () => {
		const x1formData = new JssFormData();

		x1formData.append('x21', 'a1-val');
		x1formData.append('x22', 'a2-val');
		x1formData.append('x23', 'x231-arr-val');
		x1formData.append('x23', 'x232-arr-val');
		x1formData.append('x23', 'x233-arr-val');

		expect(x1formData.toUrlEncodedFormData()).to.equal(
			'x21=a1-val&x22=a2-val&x23=x231-arr-val&x23=x232-arr-val&x23=x233-arr-val'
		);
	});
});

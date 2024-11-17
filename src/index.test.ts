import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule } from './index.js';
import { afterAll, describe, it } from 'vitest';

RuleTester.afterAll = afterAll;
RuleTester.describe = describe;
RuleTester.it = it;

const ruleTester = new RuleTester();

ruleTester.run('no-promise-combinators', rule, {
	valid: [
		{
			code: `
				async function a() { return 1; }
				async function b() { return 2; }
				async function c() {
					try {
						await a();
						await b();
					} catch (e) {
						console.error(e);
					}
				}
			`,
			name: 'try-catch block'
		},
		{
			code: `try {
	const mail = await checkMail();
	console.log(mail);
} catch (err: unknown) {
	console.error(err);
} finally {
	console.log('Experiment completed');
}`,
			name: 'readme valid',
		}
	],
	invalid: [
		{
			code: '(async () => 1).catch(e => { console.log(e); });',
			errors: [{
				messageId: 'catch',
			}],
		},
		{
			code: '(async () => 1).then(one => { console.log(one); });',
			errors: [{
				messageId: 'then',
			}],
		},
		{
			code: `checkMail()
	.then(mail => {
		console.log(mail);
	})
	.catch(err => {
		console.error(err);
	})
	.finally(() => {
		console.log('Experiment completed');
	});`,
			name: 'readme invalid',
			errors: [
				{ messageId: 'then', line: 2 },
				{ messageId: 'catch', line: 5 },
				{ messageId: 'finally', line: 8 },
			],
		},
	],
});

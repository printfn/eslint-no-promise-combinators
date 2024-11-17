# eslint-no-promise-combinators

This adds an eslint rule to disallow the promise combinator functions `.then()`,
`.catch()` and `.finally()`.

Instead of writing:

```typescript
checkMail()
	.then(mail => {
		console.log(mail);
	})
	.catch(err => {
		console.error(err);
	})
	.finally(() => {
		console.log('Experiment completed');
	});
```

You should write:

```typescript
try {
	const mail = await checkMail();
	console.log(mail);
} catch (err: unknown) {
	console.error(err);
} finally {
	console.log('Experiment completed');
}
```

## Usage

Install this package:

```sh
npm install -D eslint-no-promise-combinators
```

Then add this to your `eslint.config.ts` file:

```typescript
import { noPromiseCombinators } from 'eslint-no-promise-combinators';

export default tseslint.config(
	{
		plugins: {
			'no-promise-combinators': noPromiseCombinators,
		},
		rules: {
			'no-promise-combinators/no-promise-combinators': 'error',
		},
	},
);
```

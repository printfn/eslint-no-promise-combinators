import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
	() => `https://github.com/printfn/eslint-no-promise-combinators?tab=readme-ov-file`,
);

export const rule = createRule({
	create(context) {
		return {
			CallExpression(node) {
				if (node.callee.type !== AST_NODE_TYPES.MemberExpression || node.callee.property.type !== AST_NODE_TYPES.Identifier)
					return;
				if (node.callee.property.name === 'then') {
					context.report({
						messageId: 'then',
						node: node.callee.property,
					});
				}
				if (node.callee.property.name === 'catch') {
					context.report({
						messageId: 'catch',
						node: node.callee.property,
					});
				}
				if (node.callee.property.name === 'finally') {
					context.report({
						messageId: 'finally',
						node: node.callee.property,
					});
				}
			},
		};
	},
	name: 'no-promise-combinators',
	meta: {
		docs: {
			description:
				'avoid promise combinators `.then()`, `.catch()` and `.finally()`',
		},
		messages: {
			then: 'use `await` instead of than `.then()`',
			catch: 'use a try-catch block instead of `.catch()`',
			finally: 'use a try-finally block instead of `.finally()`',
		},
		type: 'suggestion',
		schema: [],
	},
	defaultOptions: [],
});

export const noPromiseCombinators = {
	meta: {
		name: 'no-promise-combinators',
		version: '1.0.2',
	},
	rules: {
		'no-promise-combinators': rule,
	}
};

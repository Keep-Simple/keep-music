import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type QueryKeySpecifier = ('posts' | 'post' | 'me' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	posts?: FieldPolicy<any> | FieldReadFunction<any>,
	post?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PostKeySpecifier = ('id' | 'title' | 'text' | 'points' | 'creatorId' | 'voteStatus' | 'creator' | 'createdAt' | 'updatedAt' | 'textSnippet' | PostKeySpecifier)[];
export type PostFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	title?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	points?: FieldPolicy<any> | FieldReadFunction<any>,
	creatorId?: FieldPolicy<any> | FieldReadFunction<any>,
	voteStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	textSnippet?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'username' | 'email' | 'createdAt' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createPost' | 'updatePost' | 'deletePost' | 'vote' | 'forgotPassword' | 'changePassword' | 'register' | 'login' | 'logout' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createPost?: FieldPolicy<any> | FieldReadFunction<any>,
	updatePost?: FieldPolicy<any> | FieldReadFunction<any>,
	deletePost?: FieldPolicy<any> | FieldReadFunction<any>,
	vote?: FieldPolicy<any> | FieldReadFunction<any>,
	forgotPassword?: FieldPolicy<any> | FieldReadFunction<any>,
	changePassword?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	logout?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResponseKeySpecifier = ('errors' | 'user' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
	errors?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FieldErrorKeySpecifier = ('field' | 'message' | FieldErrorKeySpecifier)[];
export type FieldErrorFieldPolicy = {
	field?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Post?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PostKeySpecifier | (() => undefined | PostKeySpecifier),
		fields?: PostFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	UserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier),
		fields?: UserResponseFieldPolicy,
	},
	FieldError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FieldErrorKeySpecifier | (() => undefined | FieldErrorKeySpecifier),
		fields?: FieldErrorFieldPolicy,
	}
};
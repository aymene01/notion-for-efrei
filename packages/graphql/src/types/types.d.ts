export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  JSON: any;
};

export type Hello = {
  __typename?: 'Hello';
  message: Scalars['String'];
};

export type Meta = {
  __typename?: 'Meta';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: UserAuthenticated;
  createPost: Post;
  createSession: UserAuthenticated;
  deletePost: Post;
  updatePost: Post;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationCreateSessionArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationDeletePostArgs = {
  uuid: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  uuid: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  authorUuid?: Maybe<Scalars['String']>;
  content?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['Date'];
  title: Scalars['String'];
  updatedAt: Scalars['Date'];
  uuid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getAllPosts: Array<Post>;
  getMe: User;
  getPost: Post;
  hello: Hello;
};


export type QueryGetPostArgs = {
  uuid: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  posts?: Maybe<Array<Post>>;
  uuid: Scalars['String'];
};

export type UserAuthenticated = {
  __typename?: 'UserAuthenticated';
  meta: Meta;
  user: User;
};

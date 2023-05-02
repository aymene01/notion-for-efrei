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
};

export type Meta = {
  __typename?: 'Meta';
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAccount: UserAuthenticated;
  createSession: UserAuthenticated;
};


export type MutationCreateAccountArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateSessionArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  uuid: Scalars['String'];
};

export type UserAuthenticated = {
  __typename?: 'UserAuthenticated';
  meta: Meta;
  user: User;
};

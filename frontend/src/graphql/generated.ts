import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type Comment = {
  __typename?: 'Comment';
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  postId: Scalars['Int']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCommentDto = {
  authorId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  postId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type CreatePostDto = {
  authorId: Scalars['Int']['input'];
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type CreateUserDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type LogInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comment;
  createPost: Post;
  createUser: User;
  deletePost: Post;
  deleteUser: User;
  logIn: User;
  logOut: Scalars['Boolean']['output'];
  updatePost: Post;
  updateUser: User;
};


export type MutationCreateCommentArgs = {
  createCommentDto: CreateCommentDto;
};


export type MutationCreatePostArgs = {
  createPostDto: CreatePostDto;
};


export type MutationCreateUserArgs = {
  createUserDto: CreateUserDto;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Int']['input'];
};


export type MutationLogInArgs = {
  logInDto: LogInDto;
};


export type MutationUpdatePostArgs = {
  updatePostDto: UpdatePostDto;
};


export type MutationUpdateUserArgs = {
  updateUserDto: UpdateUserDto;
};

export type Post = {
  __typename?: 'Post';
  authorId: Scalars['Int']['output'];
  content: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  published: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Query = {
  __typename?: 'Query';
  checkIfUserWithEmailExist: Scalars['Boolean']['output'];
  getAllUsers: Array<User>;
  getLoggedUser: User;
  getManyPost: Array<Post>;
  getOnePostById: Post;
  getOneUserById: User;
};


export type QueryCheckIfUserWithEmailExistArgs = {
  email: Scalars['String']['input'];
};


export type QueryGetManyPostArgs = {
  authorId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetOnePostByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetOneUserByIdArgs = {
  id: Scalars['Int']['input'];
};

export type UpdatePostDto = {
  content?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  published?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserDto = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  password?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  username: Scalars['String']['output'];
};

export type CreateCommentMutationVariables = Exact<{
  createCommentDto: CreateCommentDto;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, authorId: number, postId: number, title: string, content: string, createdAt: any, updatedAt: any } };

export type CreatePostMutationVariables = Exact<{
  createPostDto: CreatePostDto;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'Post', id: number, authorId: number, title: string, content: string, published: boolean, createdAt: any, updatedAt: any } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: { __typename?: 'Post', id: number, authorId: number, title: string, content: string, published: boolean, createdAt: any, updatedAt: any } };

export type GetManyPostQueryVariables = Exact<{
  authorId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type GetManyPostQuery = { __typename?: 'Query', getManyPost: Array<{ __typename?: 'Post', id: number, authorId: number, title: string, content: string, published: boolean, createdAt: any, updatedAt: any }> };

export type GetOnePostByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetOnePostByIdQuery = { __typename?: 'Query', getOnePostById: { __typename?: 'Post', id: number, authorId: number, title: string, content: string, published: boolean, createdAt: any, updatedAt: any } };

export type UpdatePostMutationVariables = Exact<{
  updatePostDto: UpdatePostDto;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'Post', id: number, authorId: number, title: string, content: string, published: boolean, createdAt: any, updatedAt: any } };

export type CheckIfUserWithEmailExistQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type CheckIfUserWithEmailExistQuery = { __typename?: 'Query', checkIfUserWithEmailExist: boolean };

export type CreateUserMutationVariables = Exact<{
  createUserDto: CreateUserDto;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: number, email: string, username: string, createdAt: any } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: { __typename?: 'User', id: number, email: string, username: string } };

export type GetLoggedUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedUserQuery = { __typename?: 'Query', getLoggedUser: { __typename?: 'User', id: number, email: string, username: string, createdAt: any } };

export type GetOneUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type GetOneUserByIdQuery = { __typename?: 'Query', getOneUserById: { __typename?: 'User', id: number, email: string, username: string, createdAt: any } };

export type LogInMutationVariables = Exact<{
  logInDto: LogInDto;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'User', id: number, email: string, username: string, createdAt: any } };

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: boolean };

export type UpdateUserMutationVariables = Exact<{
  updateUserDto: UpdateUserDto;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: number, email: string, username: string, createdAt: any } };


export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentDto: CreateCommentDto!) {
  createComment(createCommentDto: $createCommentDto) {
    id
    authorId
    postId
    title
    content
    createdAt
    updatedAt
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentDto: // value for 'createCommentDto'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($createPostDto: CreatePostDto!) {
  createPost(createPostDto: $createPostDto) {
    id
    authorId
    title
    content
    published
    createdAt
    updatedAt
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      createPostDto: // value for 'createPostDto'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
  deletePost(id: $id) {
    id
    authorId
    title
    content
    published
    createdAt
    updatedAt
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const GetManyPostDocument = gql`
    query GetManyPost($authorId: Int) {
  getManyPost(authorId: $authorId) {
    id
    authorId
    title
    content
    published
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetManyPostQuery__
 *
 * To run a query within a React component, call `useGetManyPostQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetManyPostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetManyPostQuery({
 *   variables: {
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useGetManyPostQuery(baseOptions?: Apollo.QueryHookOptions<GetManyPostQuery, GetManyPostQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetManyPostQuery, GetManyPostQueryVariables>(GetManyPostDocument, options);
      }
export function useGetManyPostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetManyPostQuery, GetManyPostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetManyPostQuery, GetManyPostQueryVariables>(GetManyPostDocument, options);
        }
export function useGetManyPostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetManyPostQuery, GetManyPostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetManyPostQuery, GetManyPostQueryVariables>(GetManyPostDocument, options);
        }
export type GetManyPostQueryHookResult = ReturnType<typeof useGetManyPostQuery>;
export type GetManyPostLazyQueryHookResult = ReturnType<typeof useGetManyPostLazyQuery>;
export type GetManyPostSuspenseQueryHookResult = ReturnType<typeof useGetManyPostSuspenseQuery>;
export type GetManyPostQueryResult = Apollo.QueryResult<GetManyPostQuery, GetManyPostQueryVariables>;
export const GetOnePostByIdDocument = gql`
    query GetOnePostById($id: Int!) {
  getOnePostById(id: $id) {
    id
    authorId
    title
    content
    published
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetOnePostByIdQuery__
 *
 * To run a query within a React component, call `useGetOnePostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOnePostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOnePostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOnePostByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOnePostByIdQuery, GetOnePostByIdQueryVariables> & ({ variables: GetOnePostByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>(GetOnePostByIdDocument, options);
      }
export function useGetOnePostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>(GetOnePostByIdDocument, options);
        }
export function useGetOnePostByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>(GetOnePostByIdDocument, options);
        }
export type GetOnePostByIdQueryHookResult = ReturnType<typeof useGetOnePostByIdQuery>;
export type GetOnePostByIdLazyQueryHookResult = ReturnType<typeof useGetOnePostByIdLazyQuery>;
export type GetOnePostByIdSuspenseQueryHookResult = ReturnType<typeof useGetOnePostByIdSuspenseQuery>;
export type GetOnePostByIdQueryResult = Apollo.QueryResult<GetOnePostByIdQuery, GetOnePostByIdQueryVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($updatePostDto: UpdatePostDto!) {
  updatePost(updatePostDto: $updatePostDto) {
    id
    authorId
    title
    content
    published
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      updatePostDto: // value for 'updatePostDto'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const CheckIfUserWithEmailExistDocument = gql`
    query CheckIfUserWithEmailExist($email: String!) {
  checkIfUserWithEmailExist(email: $email)
}
    `;

/**
 * __useCheckIfUserWithEmailExistQuery__
 *
 * To run a query within a React component, call `useCheckIfUserWithEmailExistQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckIfUserWithEmailExistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckIfUserWithEmailExistQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useCheckIfUserWithEmailExistQuery(baseOptions: Apollo.QueryHookOptions<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables> & ({ variables: CheckIfUserWithEmailExistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>(CheckIfUserWithEmailExistDocument, options);
      }
export function useCheckIfUserWithEmailExistLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>(CheckIfUserWithEmailExistDocument, options);
        }
export function useCheckIfUserWithEmailExistSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>(CheckIfUserWithEmailExistDocument, options);
        }
export type CheckIfUserWithEmailExistQueryHookResult = ReturnType<typeof useCheckIfUserWithEmailExistQuery>;
export type CheckIfUserWithEmailExistLazyQueryHookResult = ReturnType<typeof useCheckIfUserWithEmailExistLazyQuery>;
export type CheckIfUserWithEmailExistSuspenseQueryHookResult = ReturnType<typeof useCheckIfUserWithEmailExistSuspenseQuery>;
export type CheckIfUserWithEmailExistQueryResult = Apollo.QueryResult<CheckIfUserWithEmailExistQuery, CheckIfUserWithEmailExistQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($createUserDto: CreateUserDto!) {
  createUser(createUserDto: $createUserDto) {
    id
    email
    username
    createdAt
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      createUserDto: // value for 'createUserDto'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: Int!) {
  deleteUser(id: $id) {
    id
    email
    username
  }
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const GetLoggedUserDocument = gql`
    query GetLoggedUser {
  getLoggedUser {
    id
    email
    username
    createdAt
  }
}
    `;

/**
 * __useGetLoggedUserQuery__
 *
 * To run a query within a React component, call `useGetLoggedUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedUserQuery(baseOptions?: Apollo.QueryHookOptions<GetLoggedUserQuery, GetLoggedUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLoggedUserQuery, GetLoggedUserQueryVariables>(GetLoggedUserDocument, options);
      }
export function useGetLoggedUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedUserQuery, GetLoggedUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLoggedUserQuery, GetLoggedUserQueryVariables>(GetLoggedUserDocument, options);
        }
export function useGetLoggedUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetLoggedUserQuery, GetLoggedUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetLoggedUserQuery, GetLoggedUserQueryVariables>(GetLoggedUserDocument, options);
        }
export type GetLoggedUserQueryHookResult = ReturnType<typeof useGetLoggedUserQuery>;
export type GetLoggedUserLazyQueryHookResult = ReturnType<typeof useGetLoggedUserLazyQuery>;
export type GetLoggedUserSuspenseQueryHookResult = ReturnType<typeof useGetLoggedUserSuspenseQuery>;
export type GetLoggedUserQueryResult = Apollo.QueryResult<GetLoggedUserQuery, GetLoggedUserQueryVariables>;
export const GetOneUserByIdDocument = gql`
    query GetOneUserById($id: Int!) {
  getOneUserById(id: $id) {
    id
    email
    username
    createdAt
  }
}
    `;

/**
 * __useGetOneUserByIdQuery__
 *
 * To run a query within a React component, call `useGetOneUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOneUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOneUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetOneUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetOneUserByIdQuery, GetOneUserByIdQueryVariables> & ({ variables: GetOneUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>(GetOneUserByIdDocument, options);
      }
export function useGetOneUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>(GetOneUserByIdDocument, options);
        }
export function useGetOneUserByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>(GetOneUserByIdDocument, options);
        }
export type GetOneUserByIdQueryHookResult = ReturnType<typeof useGetOneUserByIdQuery>;
export type GetOneUserByIdLazyQueryHookResult = ReturnType<typeof useGetOneUserByIdLazyQuery>;
export type GetOneUserByIdSuspenseQueryHookResult = ReturnType<typeof useGetOneUserByIdSuspenseQuery>;
export type GetOneUserByIdQueryResult = Apollo.QueryResult<GetOneUserByIdQuery, GetOneUserByIdQueryVariables>;
export const LogInDocument = gql`
    mutation logIn($logInDto: LogInDto!) {
  logIn(logInDto: $logInDto) {
    id
    email
    username
    createdAt
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<LogInMutation, LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      logInDto: // value for 'logInDto'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<LogInMutation, LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogInMutation, LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<LogInMutation, LogInMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserDto: UpdateUserDto!) {
  updateUser(updateUserDto: $updateUserDto) {
    id
    email
    username
    createdAt
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserDto: // value for 'updateUserDto'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const namedOperations = {
  Query: {
    GetManyPost: 'GetManyPost',
    GetOnePostById: 'GetOnePostById',
    CheckIfUserWithEmailExist: 'CheckIfUserWithEmailExist',
    GetLoggedUser: 'GetLoggedUser',
    GetOneUserById: 'GetOneUserById'
  },
  Mutation: {
    CreateComment: 'CreateComment',
    CreatePost: 'CreatePost',
    DeletePost: 'DeletePost',
    UpdatePost: 'UpdatePost',
    CreateUser: 'CreateUser',
    DeleteUser: 'DeleteUser',
    logIn: 'logIn',
    LogOut: 'LogOut',
    UpdateUser: 'UpdateUser'
  }
}
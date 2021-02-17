import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
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

export type Song = {
  __typename?: 'Song';
  id: Scalars['Float'];
  name: Scalars['String'];
  link: Scalars['String'];
  byteSize: Scalars['Float'];
  duration: Scalars['Float'];
  views: Scalars['Float'];
  order: Scalars['Float'];
  format: Scalars['String'];
  albumId: Scalars['Float'];
  authorId: Scalars['Float'];
};

export type Album = {
  __typename?: 'Album';
  id: Scalars['Float'];
  tracksNumber?: Maybe<Scalars['Float']>;
  cover: Scalars['String'];
  name: Scalars['String'];
  releaseYear: Scalars['Float'];
  authorId: Scalars['Float'];
  author: Author;
  songs?: Maybe<Array<Song>>;
};


export type AlbumSongsArgs = {
  orderBy?: Maybe<Scalars['String']>;
};

export type Author = {
  __typename?: 'Author';
  id: Scalars['Float'];
  name: Scalars['String'];
  info: Scalars['String'];
  avatar: Scalars['String'];
  photos: Array<Scalars['String']>;
  albums?: Maybe<Array<Album>>;
  songs?: Maybe<Array<Song>>;
};


export type AuthorSongsArgs = {
  limit?: Maybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type SongInputBase = {
  name: Scalars['String'];
  link: Scalars['String'];
  duration: Scalars['Float'];
  order: Scalars['Float'];
  format: Scalars['String'];
  byteSize: Scalars['Float'];
};

export type SongInput = {
  name: Scalars['String'];
  link: Scalars['String'];
  duration: Scalars['Float'];
  order: Scalars['Float'];
  format: Scalars['String'];
  byteSize: Scalars['Float'];
  authorId: Scalars['Float'];
  albumId: Scalars['Float'];
};

export type AlbumInput = {
  name: Scalars['String'];
  authorId: Scalars['Float'];
  songs?: Maybe<Array<SongInputBase>>;
  cover?: Maybe<Scalars['String']>;
  releaseYear: Scalars['Float'];
};

export type AuthorInput = {
  name: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  photos?: Maybe<Array<Scalars['String']>>;
};

export type SignTokenInput = {
  source: Scalars['String'];
  timestamp: Scalars['Float'];
  folder?: Maybe<Scalars['String']>;
  upload_preset?: Maybe<Scalars['String']>;
};

export type AuthInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  song?: Maybe<Song>;
  album?: Maybe<Album>;
  albums?: Maybe<Array<Album>>;
  author?: Maybe<Author>;
  authors?: Maybe<Array<Author>>;
  me?: Maybe<User>;
  signUpload: Scalars['String'];
};


export type QuerySongArgs = {
  id: Scalars['Int'];
};


export type QueryAlbumArgs = {
  id: Scalars['Int'];
};


export type QueryAuthorArgs = {
  id: Scalars['Int'];
};


export type QueryAuthorsArgs = {
  searchQuery?: Maybe<Scalars['String']>;
};


export type QuerySignUploadArgs = {
  input: SignTokenInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  viewSong: Scalars['Boolean'];
  createAlbum: Album;
  createAuthor: Author;
  forgotPassword: Scalars['Boolean'];
  changePassword: UserResponse;
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationViewSongArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAlbumArgs = {
  input: AlbumInput;
};


export type MutationCreateAuthorArgs = {
  input: AuthorInput;
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationRegisterArgs = {
  options: AuthInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & ShortUserFragment
  )> }
);

export type ShortUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type ChangePasswordMutationVariables = Exact<{
  token: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type CreateAlbumMutationVariables = Exact<{
  input: AlbumInput;
}>;


export type CreateAlbumMutation = (
  { __typename?: 'Mutation' }
  & { createAlbum: (
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name' | 'cover' | 'releaseYear' | 'tracksNumber'>
    & { songs?: Maybe<Array<(
      { __typename?: 'Song' }
      & Pick<Song, 'id' | 'name' | 'link' | 'byteSize' | 'duration' | 'views' | 'order' | 'format' | 'albumId' | 'authorId'>
    )>>, author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  ) }
);

export type CreateAuthorMutationVariables = Exact<{
  input: AuthorInput;
}>;


export type CreateAuthorMutation = (
  { __typename?: 'Mutation' }
  & { createAuthor: (
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'info' | 'avatar' | 'photos'>
  ) }
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: AuthInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type ViewSongMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ViewSongMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'viewSong'>
);

export type AlbumQueryVariables = Exact<{
  id: Scalars['Int'];
  orderBy?: Maybe<Scalars['String']>;
}>;


export type AlbumQuery = (
  { __typename?: 'Query' }
  & { album?: Maybe<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name' | 'tracksNumber' | 'cover' | 'releaseYear'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ), songs?: Maybe<Array<(
      { __typename?: 'Song' }
      & Pick<Song, 'id' | 'order' | 'duration' | 'name' | 'views' | 'format' | 'link' | 'albumId'>
    )>> }
  )> }
);

export type AlbumsQueryVariables = Exact<{ [key: string]: never; }>;


export type AlbumsQuery = (
  { __typename?: 'Query' }
  & { albums?: Maybe<Array<(
    { __typename?: 'Album' }
    & Pick<Album, 'id' | 'name' | 'cover' | 'releaseYear'>
    & { author: (
      { __typename?: 'Author' }
      & Pick<Author, 'id' | 'name'>
    ) }
  )>> }
);

export type AuthorQueryVariables = Exact<{
  id: Scalars['Int'];
  limit?: Maybe<Scalars['Int']>;
}>;


export type AuthorQuery = (
  { __typename?: 'Query' }
  & { author?: Maybe<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'info' | 'avatar' | 'photos'>
    & { albums?: Maybe<Array<(
      { __typename?: 'Album' }
      & Pick<Album, 'tracksNumber' | 'name'>
      & { songs?: Maybe<Array<(
        { __typename?: 'Song' }
        & Pick<Song, 'name' | 'order' | 'views' | 'id'>
      )>> }
    )>>, songs?: Maybe<Array<(
      { __typename?: 'Song' }
      & Pick<Song, 'id' | 'name' | 'views' | 'albumId' | 'duration' | 'link'>
    )>> }
  )> }
);

export type AuthorsQueryVariables = Exact<{
  searchQuery?: Maybe<Scalars['String']>;
}>;


export type AuthorsQuery = (
  { __typename?: 'Query' }
  & { authors?: Maybe<Array<(
    { __typename?: 'Author' }
    & Pick<Author, 'id' | 'name' | 'avatar'>
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & ShortUserFragment
  )> }
);

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const ShortUserFragmentDoc = gql`
    fragment ShortUser on User {
  id
  username
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...ShortUser
  }
}
    ${RegularErrorFragmentDoc}
${ShortUserFragmentDoc}`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
  changePassword(token: $token, newPassword: $newPassword) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateAlbumDocument = gql`
    mutation CreateAlbum($input: AlbumInput!) {
  createAlbum(input: $input) {
    id
    name
    cover
    releaseYear
    tracksNumber
    songs {
      id
      name
      link
      byteSize
      duration
      views
      order
      format
      albumId
      authorId
    }
    author {
      id
      name
    }
  }
}
    `;
export type CreateAlbumMutationFn = Apollo.MutationFunction<CreateAlbumMutation, CreateAlbumMutationVariables>;

/**
 * __useCreateAlbumMutation__
 *
 * To run a mutation, you first call `useCreateAlbumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAlbumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAlbumMutation, { data, loading, error }] = useCreateAlbumMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAlbumMutation(baseOptions?: Apollo.MutationHookOptions<CreateAlbumMutation, CreateAlbumMutationVariables>) {
        return Apollo.useMutation<CreateAlbumMutation, CreateAlbumMutationVariables>(CreateAlbumDocument, baseOptions);
      }
export type CreateAlbumMutationHookResult = ReturnType<typeof useCreateAlbumMutation>;
export type CreateAlbumMutationResult = Apollo.MutationResult<CreateAlbumMutation>;
export type CreateAlbumMutationOptions = Apollo.BaseMutationOptions<CreateAlbumMutation, CreateAlbumMutationVariables>;
export const CreateAuthorDocument = gql`
    mutation CreateAuthor($input: AuthorInput!) {
  createAuthor(input: $input) {
    id
    name
    info
    avatar
    photos
  }
}
    `;
export type CreateAuthorMutationFn = Apollo.MutationFunction<CreateAuthorMutation, CreateAuthorMutationVariables>;

/**
 * __useCreateAuthorMutation__
 *
 * To run a mutation, you first call `useCreateAuthorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAuthorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAuthorMutation, { data, loading, error }] = useCreateAuthorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAuthorMutation(baseOptions?: Apollo.MutationHookOptions<CreateAuthorMutation, CreateAuthorMutationVariables>) {
        return Apollo.useMutation<CreateAuthorMutation, CreateAuthorMutationVariables>(CreateAuthorDocument, baseOptions);
      }
export type CreateAuthorMutationHookResult = ReturnType<typeof useCreateAuthorMutation>;
export type CreateAuthorMutationResult = Apollo.MutationResult<CreateAuthorMutation>;
export type CreateAuthorMutationOptions = Apollo.BaseMutationOptions<CreateAuthorMutation, CreateAuthorMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($options: AuthInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ViewSongDocument = gql`
    mutation ViewSong($id: Int!) {
  viewSong(id: $id)
}
    `;
export type ViewSongMutationFn = Apollo.MutationFunction<ViewSongMutation, ViewSongMutationVariables>;

/**
 * __useViewSongMutation__
 *
 * To run a mutation, you first call `useViewSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useViewSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [viewSongMutation, { data, loading, error }] = useViewSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useViewSongMutation(baseOptions?: Apollo.MutationHookOptions<ViewSongMutation, ViewSongMutationVariables>) {
        return Apollo.useMutation<ViewSongMutation, ViewSongMutationVariables>(ViewSongDocument, baseOptions);
      }
export type ViewSongMutationHookResult = ReturnType<typeof useViewSongMutation>;
export type ViewSongMutationResult = Apollo.MutationResult<ViewSongMutation>;
export type ViewSongMutationOptions = Apollo.BaseMutationOptions<ViewSongMutation, ViewSongMutationVariables>;
export const AlbumDocument = gql`
    query Album($id: Int!, $orderBy: String) {
  album(id: $id) {
    id
    name
    tracksNumber
    cover
    releaseYear
    author {
      id
      name
    }
    songs(orderBy: $orderBy) {
      id
      order
      duration
      name
      views
      format
      link
      albumId
    }
  }
}
    `;

/**
 * __useAlbumQuery__
 *
 * To run a query within a React component, call `useAlbumQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumQuery({
 *   variables: {
 *      id: // value for 'id'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useAlbumQuery(baseOptions: Apollo.QueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
        return Apollo.useQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
      }
export function useAlbumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlbumQuery, AlbumQueryVariables>) {
          return Apollo.useLazyQuery<AlbumQuery, AlbumQueryVariables>(AlbumDocument, baseOptions);
        }
export type AlbumQueryHookResult = ReturnType<typeof useAlbumQuery>;
export type AlbumLazyQueryHookResult = ReturnType<typeof useAlbumLazyQuery>;
export type AlbumQueryResult = Apollo.QueryResult<AlbumQuery, AlbumQueryVariables>;
export const AlbumsDocument = gql`
    query Albums {
  albums {
    id
    name
    cover
    releaseYear
    author {
      id
      name
    }
  }
}
    `;

/**
 * __useAlbumsQuery__
 *
 * To run a query within a React component, call `useAlbumsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAlbumsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAlbumsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAlbumsQuery(baseOptions?: Apollo.QueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
        return Apollo.useQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
      }
export function useAlbumsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AlbumsQuery, AlbumsQueryVariables>) {
          return Apollo.useLazyQuery<AlbumsQuery, AlbumsQueryVariables>(AlbumsDocument, baseOptions);
        }
export type AlbumsQueryHookResult = ReturnType<typeof useAlbumsQuery>;
export type AlbumsLazyQueryHookResult = ReturnType<typeof useAlbumsLazyQuery>;
export type AlbumsQueryResult = Apollo.QueryResult<AlbumsQuery, AlbumsQueryVariables>;
export const AuthorDocument = gql`
    query Author($id: Int!, $limit: Int) {
  author(id: $id) {
    id
    name
    info
    avatar
    photos
    albums {
      tracksNumber
      name
      songs {
        name
        order
        views
        id
      }
    }
    songs(limit: $limit) {
      id
      name
      views
      albumId
      duration
      link
    }
  }
}
    `;

/**
 * __useAuthorQuery__
 *
 * To run a query within a React component, call `useAuthorQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorQuery({
 *   variables: {
 *      id: // value for 'id'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAuthorQuery(baseOptions: Apollo.QueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
        return Apollo.useQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, baseOptions);
      }
export function useAuthorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorQuery, AuthorQueryVariables>) {
          return Apollo.useLazyQuery<AuthorQuery, AuthorQueryVariables>(AuthorDocument, baseOptions);
        }
export type AuthorQueryHookResult = ReturnType<typeof useAuthorQuery>;
export type AuthorLazyQueryHookResult = ReturnType<typeof useAuthorLazyQuery>;
export type AuthorQueryResult = Apollo.QueryResult<AuthorQuery, AuthorQueryVariables>;
export const AuthorsDocument = gql`
    query Authors($searchQuery: String) {
  authors(searchQuery: $searchQuery) {
    id
    name
    avatar
  }
}
    `;

/**
 * __useAuthorsQuery__
 *
 * To run a query within a React component, call `useAuthorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthorsQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useAuthorsQuery(baseOptions?: Apollo.QueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
        return Apollo.useQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, baseOptions);
      }
export function useAuthorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthorsQuery, AuthorsQueryVariables>) {
          return Apollo.useLazyQuery<AuthorsQuery, AuthorsQueryVariables>(AuthorsDocument, baseOptions);
        }
export type AuthorsQueryHookResult = ReturnType<typeof useAuthorsQuery>;
export type AuthorsLazyQueryHookResult = ReturnType<typeof useAuthorsLazyQuery>;
export type AuthorsQueryResult = Apollo.QueryResult<AuthorsQuery, AuthorsQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    ...ShortUser
  }
}
    ${ShortUserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
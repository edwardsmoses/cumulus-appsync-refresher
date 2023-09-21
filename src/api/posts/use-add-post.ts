import { API, graphqlOperation } from 'aws-amplify';
import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { createTodo } from '@/graphql/mutations';

import type { Post } from './types';

type Variables = { title: string; body: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) => {
    const result = await API.graphql(
      graphqlOperation(createTodo, { input: variables.body })
    );
    const newTodo = result.data.createTodo;
    return newTodo;
  },
});

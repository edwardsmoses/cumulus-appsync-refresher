import { API, graphqlOperation } from 'aws-amplify';
import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { listTodos } from '@/graphql/queries';

import type { Post } from './types';

type Response = Post[];
type Variables = void; // as react-query-kit is strongly typed, we need to specify the type of the variables as void in case we don't need them

export const usePosts = createQuery<Response, Variables, AxiosError>({
  primaryKey: 'posts', // we recommend using  endpoint base url as primaryKey
  queryFn: async ({ queryKey: [primaryKey] }) => {
    // in case if variables is needed, we can use destructuring to get it from queryKey array like this: ({ queryKey: [primaryKey, variables] })
    // primaryKey is 'posts' in this case
    const todoData = await API.graphql(graphqlOperation(listTodos));
    const todos = todoData.data.listTodos.items;
    console.log(todos);
    return todos;
  },
});

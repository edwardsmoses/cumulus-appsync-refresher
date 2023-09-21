import { zodResolver } from '@hookform/resolvers/zod';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { showMessage } from 'react-native-flash-message';
import { z } from 'zod';

import { useAddPost } from '@/api';
import { Button, ControlledInput, showErrorMessage, View } from '@/ui';

const schema = z.object({
  body: z.string().min(120)
});

type FormType = z.infer<typeof schema>;

export const AddPost = () => {
  const { control, handleSubmit } = useForm<FormType>({
    resolver: zodResolver(schema)
  });
  const { mutate: addPost, isLoading } = useAddPost();

  const onSubmit = (data: FormType) => {
    console.log(data);

    addPost(
      { ...data, userId: 1 },
      {
        onSuccess: () => {
          showMessage({
            message: 'Post added successfully',
            type: 'success'
          });
          // here you can navigate to the post list and refresh the list data
          //queryClient.invalidateQueries(usePosts.getKey());
        },
        onError: () => {
          showErrorMessage('Error adding post');
        }
      }
    );
  };
  return (
    <View className="flex-1 p-4 ">
      <ControlledInput
        name="body"
        label="What are your plans?"
        control={control}
        multiline
        testID="body-input"
      />
      <Button
        label="Add Todo"
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
        testID="add-post-button"
      />
    </View>
  );
};

"use client"

import * as z from "zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from '@hookform/resolvers/zod';

import { usePathname, useRouter } from 'next/navigation';
import { PostValidation } from "@/lib/validations/post";
import { createPost } from "@/lib/actions/post.actions";
import { getRandomValues } from "crypto";

// import { updateUser } from "@/lib/actions/user.actions";
// import { UserValidation } from "@/lib/validations/user";
interface Props {
  user: {
    id: string,
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function Post({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: '',
      accountId: userId,
    }
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await createPost({
        text: values.post, 
        author: userId,
        communityId: null,
        path: pathname
    });

    router.push('/');
  }

    return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 flex flex-col justify-start gap-10">
        <FormField control={form.control} name="post" render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">Content</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                <Textarea rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="bg-primary-500">Publish</Button>
        </form>
    </Form>
    )
}

export default Post;
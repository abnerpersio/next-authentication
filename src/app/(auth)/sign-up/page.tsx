'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const schema = z.object({
  name: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(1, 'Invalid name'),
  email: z
    .string({ required_error: 'Required field' })
    .trim()
    .email('Invalid email address'),
  username: z.string().trim().optional(),
  password: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(6, 'Password must have at least 6 characters'),
});

type FormValues = z.infer<typeof schema>;

export default function SignUp() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      username: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formValues) => {
    try {
      await axios.post('/api/auth/sign-up', formValues);

      toast.success('Account created successfully');
      router.push('/');
    } catch (error: unknown) {
      const message = (error as AxiosError<{ message?: string }>).response?.data
        ?.message;
      toast.error(message ?? 'Error creating account');
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>

        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          autoComplete="name"
                          placeholder="Max"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Github username (optional)</FormLabel>

                      <FormControl>
                        <Input
                          type="text"
                          placeholder="abnerpersio"
                          {...field}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>

                    <FormControl>
                      <Input
                        type="email"
                        autoComplete="email"
                        placeholder="email@email.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>

                    <FormControl>
                      <Input
                        type="password"
                        autoComplete="current-password"
                        placeholder="*******"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                isLoading={form.formState.isSubmitting}
                type="submit"
                className="w-full"
              >
                Create an account
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline underline-offset-4">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

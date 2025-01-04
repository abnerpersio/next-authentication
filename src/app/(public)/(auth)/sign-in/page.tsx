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
  email: z
    .string({ required_error: 'Required field' })
    .trim()
    .email('Invalid email address'),
  password: z
    .string({ required_error: 'Required field' })
    .trim()
    .min(6, 'Invalid password'),
});

type FormValues = z.infer<typeof schema>;

export default function SignIn() {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (formValues) => {
    try {
      await axios.post('/api/auth/sign-in', formValues);
      router.push('/');
    } catch (error: unknown) {
      const message = (error as AxiosError<{ message?: string }>).response?.data
        ?.message;
      toast.error(message ?? 'Invalid credentials');
    }
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>

        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
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
                    <div className="flex items-center">
                      <FormLabel>Password</FormLabel>

                      <Link
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline"
                      >
                        Forgot password?
                      </Link>
                    </div>

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
                Login
              </Button>
            </div>
          </form>
        </Form>

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline underline-offset-4">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

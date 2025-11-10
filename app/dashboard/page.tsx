'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/useAuthStore';
import UserHeader from '../component/UserHeader';
import { Container } from '@mui/material';
import NewPostForm from '../component/NewPostForm';
import PostList from '../component/PostList';

export default function DashboardPage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <>
      <UserHeader />
      <Container sx={{ mt: 4 }}>
        <NewPostForm onPostCreatedAction={() => setRefresh((r) => r + 1)} />
        <PostList key={refresh} />
      </Container>
    </>
  );
}

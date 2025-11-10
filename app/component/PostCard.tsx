'use client';

import { Card, CardContent, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';

interface PostCardProps {
  id: number;
  content: string;
  commentsCount: number;
}

export default function PostCard({ id, content, commentsCount }: PostCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/dashboard/${id}`);
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        mb: 2,
        cursor: 'pointer',
        transition: 'transform 0.15s ease-in-out',
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {content}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Typography variant="caption" color="text.secondary">
          Comentarios: {commentsCount}
        </Typography>
      </CardContent>
    </Card>
  );
}

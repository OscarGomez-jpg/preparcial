'use client';

import { useAuthStore } from "@/app/store/useAuthStore";
import { ArrowBack } from "@mui/icons-material";
import { Box, Button, Card, CardContent, CircularProgress, Divider, Typography } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Comment {
  id: number;
  content: string;
  user_id: number;
  created_at: string;
}

interface Post {
  id: number;
  content: string;
  created_at: string;
  user_id: number;
  comments: Comment[];
}

export default function PostDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuthStore();

  const [posts, setPosts] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchPost() {
      try {
        const res = await fetch(`http://localhost:8000/posts/${id}`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!posts) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <Typography variant="h6">No se encontró el post</Typography>
      </Box>
    )
  }

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Button
        startIcon={<ArrowBack />}
        variant="outlined"
        onClick={() => router.push('/dashboard')}
        sx={{ mb: 3 }}
      >
        Volver
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {posts.content}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Publicado el {new Date(posts.created_at).toLocaleString()}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Comentarios</Typography>
          {posts.comments && posts.comments.length > 0 ? (
            posts.comments.map((comment) => (
              <Box key={comment.id} mt={2} p={2} border="1px solid #e0e0e0" borderRadius={2}>
                <Typography variant="body2">{comment.content}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(comment.created_at).toLocaleString()}
                </Typography>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" mt={2}>
              No hay comentarios todavía.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

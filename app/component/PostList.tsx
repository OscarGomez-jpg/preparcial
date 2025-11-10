'use client';

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Card, CardContent, Divider, Typography } from "@mui/material";

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

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('http://localhost:8000/posts', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, [token])

  return (
    <div>
      {posts.map((post) => (
        <Card key={post.id} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="body1">{post.content}</Typography>
            <Divider sx={{ my: 1 }} />
            <Typography variant="caption">
              Comentarios: {post.comments.length}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

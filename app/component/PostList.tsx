'use client';

import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Card, CardContent, Divider, Typography } from "@mui/material";
import PostCard from "./PostCard";

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
        <PostCard key={post.id} id={post.id} content={post.content} commentsCount={post.comments?.length || 0} />
      ))}
    </div>
  )
}

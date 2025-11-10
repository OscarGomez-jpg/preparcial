'use client';

import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Box, Button, TextField } from "@mui/material";

export default function NewPostForm({ onPostCreatedAction }: { onPostCreatedAction: () => void }) {
  const [content, setContent] = useState('');
  const { token } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        content,
        user_id: 1,
        created_at: new Date().toISOString(),
        comments: [],
      })
    });

    setContent('');
    onPostCreatedAction();
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
      <TextField label="Nuevo Post" variant="outlined" fullWidth value={content} onChange={(e) => setContent(e.target.value)} />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Publicar
      </Button>
    </Box>
  )
}

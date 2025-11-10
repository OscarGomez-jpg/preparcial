'use client';

import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import { AppBar, Button, Toolbar, Typography } from "@mui/material";

export default function UserHeader() {
  const router = useRouter();
  const { clearToken } = useAuthStore();

  const handleLogout = () => {
    clearToken();
    router.push('/login');
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: '#1e1e1e' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">Dashboard</Typography>
        <div>
          <Button color="error" variant="contained" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  )
}

import { Box } from "@mui/material";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode; // Properly type the children prop
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div>
      <Box className="h-screen flex items-center justify-center">{children}</Box>
    </div>
  );
}

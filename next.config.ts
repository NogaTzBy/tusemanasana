import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'moomlaggpaqzzyagtvkk.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Permitir otras fuentes de imágenes comunes para recetas
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;

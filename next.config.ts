import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 全站 SSG，导出为纯静态文件，可部署到 Cloudflare Pages / Nginx / OSS 等任意静态托管
  output: 'export',
};

export default nextConfig;

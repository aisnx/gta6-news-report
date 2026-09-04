// 视频嵌入组件：把 YouTube 链接自动渲染成响应式 iframe。
// 内容作者只需在 Markdown 里写一个 YouTube 链接，例如：
//   [GTA VI Trailer 1](https://www.youtube.com/watch?v=VIDEO_ID)
// Markdown.tsx 会识别到 YouTube 链接，自动转为本组件，无需手写 iframe。

export function parseYouTube(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{6,})/
  );
  return m ? m[1] : null;
}

export function VideoEmbed({ id, title }: { id: string; title?: string }) {
  return (
    <figure className="video-embed">
      <div className="video-embed-inner">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title || 'Video'}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {title ? <figcaption>{title}</figcaption> : null}
    </figure>
  );
}

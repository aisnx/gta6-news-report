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

export function VideoEmbed({
  id,
  title,
  embeddable = true,
}: {
  id: string;
  title?: string;
  embeddable?: boolean;
}) {
  // 年龄限制视频无法在第三方站点内嵌播放，改为「缩略图 + 跳转 YouTube」卡片。
  if (!embeddable) {
    return (
      <figure className="video-embed">
        <a
          className="video-embed-cta"
          href={`https://www.youtube.com/watch?v=${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt={title || 'Video'}
            loading="lazy"
          />
          <span className="play-badge" aria-hidden="true">▶</span>
        </a>
        {title ? <figcaption>{title}</figcaption> : null}
      </figure>
    );
  }

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

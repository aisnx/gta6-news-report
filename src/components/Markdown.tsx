import type { AnchorHTMLAttributes } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { parseYouTube, VideoEmbed } from './VideoEmbed';

export function Markdown({ content }: { content: string }) {
  return (
    <div className="article">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }: AnchorHTMLAttributes<HTMLAnchorElement>) => {
            if (href) {
              const id = parseYouTube(href);
              if (id) {
                return <VideoEmbed id={id} title={typeof children === 'string' ? children : undefined} />;
              }
            }
            return <a href={href}>{children}</a>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

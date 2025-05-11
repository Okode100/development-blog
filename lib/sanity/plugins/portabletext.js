import Image from "next/image";
import Link from "next/link";
import { PortableText as PortableTextComponent } from "@portabletext/react";
import { urlForImage } from "@/lib/sanity/image";
import Iframe from "react-iframe";
import getVideoId from "get-video-id";
import { cx } from "@/utils/all";

import Refractor from "react-refractor";
import js from "refractor/lang/javascript";
import jsx from "refractor/lang/jsx";
import html from "refractor/lang/markup";
import css from "refractor/lang/css";
import bash from "refractor/lang/bash";

Refractor.registerLanguage(js);
Refractor.registerLanguage(jsx);
Refractor.registerLanguage(html);
Refractor.registerLanguage(css);
Refractor.registerLanguage(bash);

const ImageComponent = ({ value }) => {
  return (
    <figure className="my-4">
      <Image
        src={urlForImage(value)}
        alt={value.alt || "Image"}
        loading="lazy"
        className="rounded-md object-cover"
        sizes="(max-width: 800px) 100vw, 800px"
      />
      {value.caption && (
        <figcaption className="mt-2 text-center text-sm text-gray-500 italic">
          {value.caption}
        </figcaption>
      )}
    </figure>
  );
};

const VideoComponent = ({ value }) => {
  if (!value?.url) return null;

  let embedUrl = value.url;
  
  if (value.videoType === "youtube") {
    const { id } = getVideoId(value.url);
    embedUrl = `https://www.youtube-nocookie.com/embed/${id}`;
  } else if (value.videoType === "vimeo") {
    const { id } = getVideoId(value.url);
    embedUrl = `https://player.vimeo.com/video/${id}`;
  }

  return (
    <div className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-md">
        <Iframe
          url={embedUrl}
          width="100%"
          height="100%"
          className="absolute inset-0"
          display="block"
          position="relative"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        />
      </div>
      {value.caption && (
        <p className="mt-2 text-center text-sm text-gray-500 italic">
          {value.caption}
        </p>
      )}
    </div>
  );
};

const PortableTextTable = ({ value }) => {
  const [head, ...rows] = value.table.rows;

  return (
    <table>
      {head.cells.filter(Boolean).length > 0 && (
        <thead>
          <tr>
            {head.cells.map(cell => (
              <th key={cell}>{cell}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows.map((row, index) => (
          <tr key={index}>
            {row.cells.map((cell, index) => {
              return <td key={cell}>{cell}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const Code = ({ value }) => {
  return (
    <Refractor
      language={value.language || "bash"}
      value={value.code}
      markers={value.highlightedLines}
    />
  );
};

const IframePreview = ({ value }) => {
  const { url, height } = value;
  if (!url) {
    return <p>Missing Embed URL</p>;
  }
  const { id, service } = getVideoId(url);

  const isYoutubeVideo = id && service === "youtube";

  const finalURL = isYoutubeVideo
    ? `https://www.youtube-nocookie.com/embed/${id}`
    : url;

  return (
    <Iframe
      url={finalURL}
      width="100%"
      height={height || "350"}
      className={cx(!height && "aspect-video", "rounded-md")}
      display="block"
      position="relative"
      frameBorder="0"
      allowFullScreen
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
    />
  );
};

const components = {
  types: {
    image: ImageComponent,
    video: VideoComponent,
    code: Code,
    embed: IframePreview,
    tables: PortableTextTable
  },
  marks: {
    center: props => (
      <div className="text-center">{props.children}</div>
    ),
    highlight: props => (
      <span className="font-bold text-blue-500">
        {props.children}
      </span>
    ),
    link: ({ children, value }) => {
      const rel = !value.href.startsWith("/")
        ? "noopener"
        : undefined;
      const target = !value.href.startsWith("/")
        ? "_blank"
        : undefined;
      return (
        <a href={value.href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
    internalLink: ({ children, value }) => {
      return (
        <Link href={`/post/${value?.slug?.current}`}>{children}</Link>
      );
    }
  }
};

export const PortableText = props => (
  <PortableTextComponent components={components} {...props} />
);

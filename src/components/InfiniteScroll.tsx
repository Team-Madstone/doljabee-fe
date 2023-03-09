import { useRef, useEffect } from 'react';

type TProps = {
  callback: () => void;
};

const InfiniteScroll = ({ callback }: TProps) => {
  const $target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!$target.current) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback();
        }
      });
    });

    observer.observe($target.current);

    return () => observer.disconnect();
  }, [$target, callback]);

  return <div ref={$target}>loading...</div>;
};

export default InfiniteScroll;

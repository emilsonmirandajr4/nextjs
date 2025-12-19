'use client';

import { useRouter } from 'next/navigation';

import Sidebar from '../Sidebar';
import { WordPressPost } from '../../types/wordpress';
import { getPostUrl } from '../../utils/navigation';

interface SidebarClientProps {
  posts: WordPressPost[];
  title: string;
}

export default function SidebarClient({ posts, title }: SidebarClientProps) {
  const router = useRouter();

  return (
    <Sidebar
      posts={posts}
      title={title}
      onPostClick={(postId) => {
        const post = posts.find((p) => p.id === postId);
        if (post) router.push(getPostUrl(post));
      }}
    />
  );
}

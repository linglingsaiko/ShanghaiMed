import BlogDetail from '@/components/sections/BlogDetail'
import type { BlogPost } from '@/lib/types'

interface BlogDetailComponentProps {
  post: BlogPost
  previousPost?: BlogPost
  nextPost?: BlogPost
}

export default function BlogDetailComponent({
  post,
  previousPost,
  nextPost,
}: BlogDetailComponentProps) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <BlogDetail post={post} previousPost={previousPost} nextPost={nextPost} />
    </div>
  )
}

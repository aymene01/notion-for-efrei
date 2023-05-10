import * as React from 'react'
import Link from 'next/link'
import { Post } from '@efrei/graphql'
import { formatDate } from '../utils/formatDate'
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { PostOperationModal } from './PostOperation'

interface PostItemProps {
  post: Pick<Post, 'uuid' | 'title' | 'createdAt'>
}

export function PostItem({ post }: PostItemProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <div className="flex items-center justify-between p-4 border">
      <div className="grid gap-1">
        <Link href={`/app/editor/${post.uuid}`} className="font-semibold hover:underline">
          {post.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">{formatDate(post.createdAt)}</p>
        </div>
      </div>
      <EllipsisVerticalIcon className="h-6 w-6 cursor-pointer" onClick={() => setIsOpen(true)} />

      {isOpen && <PostOperationModal open={isOpen} setOpen={setIsOpen} postUuid={post.uuid} />}
    </div>
  )
}

'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import { Post } from '@efrei/graphql'
import { toast } from 'react-hot-toast'
import createPost from '@/lib/queries/createPost'
import { PlusIcon } from '@heroicons/react/24/solid'

export function PostCreateButton() {
  const { push } = useRouter()

  const { mutate, isSuccess, data } = useSwrMutation<Post, 'createPost'>(createPost, {
    onError: () => {
      toast.error('Something went wrong')
    },
  })

  React.useEffect(() => {
    if (isSuccess && data) {
      push(`/app/editor/${data.createPost.uuid}`)
    }
  }, [isSuccess, data])

  return (
    <button
      type="button"
      className="inline-flex items-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
      onClick={() =>
        mutate({
          title: 'Untitled',
        })
      }
    >
      <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
      New Post
    </button>
  )
}

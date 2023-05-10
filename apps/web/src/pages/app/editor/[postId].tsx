import * as React from 'react'
import { Editor } from '@/lib/components/Editor'
import { useRouter } from 'next/router'
import useSwrQuery from '@/lib/hooks/useSwrQuery'
import { Post } from '@efrei/graphql'
import getPost from '@/lib/queries/getPost'

export const getInialProps = async ({ query }) => {
  return {
    postId: query.postId,
  }
}

export default function PostEditor({ postId }) {
  const { data, isLoading, isError } = useSwrQuery<Post, 'getPost'>('getPost', getPost, {
    uuid: postId,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Editor
      post={{
        uuid: data?.getPost.uuid,
        title: data?.getPost.title,
        content: data?.getPost.content,
      }}
    />
  )
}

PostEditor.getInitialProps = getInialProps

import * as React from 'react'
import Link from 'next/link'
import EditorJS from '@editorjs/editorjs'
import { Post } from '@efrei/graphql'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import useSwrMutation from '@/lib/hooks/useSwrMutation'
import updatePost from '@/lib/queries/updatePost'
import { toast } from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'

import { ArrowSmallLeftIcon } from '@heroicons/react/24/solid'
import { Button } from '@chakra-ui/react'

interface EditorProps {
  post: Pick<Post, 'uuid' | 'title' | 'content'>
}

type FormData = {
  title: string
  content: string
}

export const Editor = ({ post }: EditorProps) => {
  const { register, handleSubmit } = useForm<FormData>()
  const ref = React.useRef<EditorJS>()
  const [isMounted, setIsMounted] = React.useState<boolean>(false)

  console.log(post.content)

  const queryClient = useQueryClient()

  const { mutate } = useSwrMutation<Post, 'updatedPost'>(updatePost, {
    onSuccess: () => {
      toast.success('Post successfully saved', { position: 'top-center' })
      queryClient.invalidateQueries(['getAllPosts'])
    },
    onError: () => {
      toast.error('An error occured while saving the post', { position: 'top-center' })
    },
  })

  const initializeEditor = React.useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: post.content ? JSON.parse(post.content) : undefined,
        tools: {
          header: Header,
          linkTool: LinkTool,
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post])

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMounted(true)
    }
  }, [])

  React.useEffect(() => {
    if (isMounted) {
      initializeEditor()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  const onSubmit = async (data: FormData) => {
    const blocks = await ref.current?.save()
    mutate({
      uuid: post.uuid,
      title: data.title,
      content: JSON.stringify(blocks),
    })
  }

  return (
    <form>
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link href="/app" className="flex space-x-2 ml-16">
              <ArrowSmallLeftIcon className="h-6 w-6 text-gray-500" />
              <span>Back</span>
            </Link>
          </div>
          <Button onClick={handleSubmit(onSubmit)} className="m-10 ">
            save
          </Button>
        </div>
        <div className="prose prose-stone mx-auto w-[800px] dark:prose-invert">
          <TextareaAutosize
            autoFocus
            id="title"
            defaultValue={post.title}
            placeholder="Post title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none ml-[70px]"
            {...register('title')}
          />
          <div id="editor" className="" />
          <p className="text-sm text-gray-500">
            Use <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">Tab</kbd> to open the command menu.
          </p>
        </div>
      </div>
    </form>
  )
}

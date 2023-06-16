import React from 'react'
import Navbar from '@/lib/components/Navbar'
import getAllPosts from '@/lib/queries/getAllPost'
import useSwrQuery from '@/lib/hooks/useSwrQuery'
import { Post } from '@efrei/graphql'
import { Stack } from '@chakra-ui/react'
import { DashboardHeader } from '@/lib/components/DashboadHeader'
import { PostItem } from '@/lib/components/PostItem'
import { PostCreateButton } from '@/lib/components/CreateNewPost'
import { Input } from '@chakra-ui/react'
import { isEmpty } from 'lodash'
import EmptyState from '@/lib/components/EmptyState'

const Dashboard = () => {
  const { data, isLoading } = useSwrQuery<Post[], 'getAllPosts'>('getAllPosts', getAllPosts)
  const [query, setQuery] = React.useState('')

  const filteredPosts =
    data?.getAllPosts.filter(post =>
      post.title.toLocaleLowerCase().trim().startsWith(query.toLocaleLowerCase().trim()),
    ) || []

  if (isLoading) return null

  return (
    <div className="sm: w-full">
      <Navbar />
      {data && data.getAllPosts.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="w-2/3 h-screen flex flex-col mx-auto space-y-5">
          <DashboardHeader heading="Posts" text="Create and manage post">
            <PostCreateButton />
          </DashboardHeader>
          <div className="w-full">
            <Input width="xl" placeholder="Search posts" value={query} onChange={e => setQuery(e.target.value)} />
          </div>
          <Stack spacing="4">
            {!isEmpty(filteredPosts) ? (
              filteredPosts.map(post => (
                <PostItem
                  post={{
                    uuid: post.uuid,
                    createdAt: post.createdAt,
                    title: post.title,
                  }}
                  key={post.uuid}
                />
              ))
            ) : (
              <div>
                <p className="text-center mt-5 text-gray-400 font-extralight text-5xl my-auto">
                  No posts found with this title
                </p>
              </div>
            )}
          </Stack>
        </div>
      )}
    </div>
  )
}

export default Dashboard

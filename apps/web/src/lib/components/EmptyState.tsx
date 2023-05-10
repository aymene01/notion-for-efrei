import { PlusIcon } from '@heroicons/react/20/solid'
import { PostCreateButton } from './CreateNewPost'

export default function EmptyState() {
  return (
    <div className="text-center w-full h-1/2 flex items-center flex-col justify-center p-10 mt-7">
      <svg
        className="mx-auto h-12 w-12 text-gray-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          vectorEffect="non-scaling-stroke"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
        />
      </svg>
      <h3 className="mt-2 text-sm font-semibold text-gray-900">No Post</h3>
      <p className="mt-1 text-sm text-gray-500">Get started by creating a new post</p>
      <div className="mt-6">
        {/* <button
          type="button"
          className="inline-flex items-center rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
          New Post

        </button> */}
        <PostCreateButton />
      </div>
    </div>
  )
}
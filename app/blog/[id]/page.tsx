import { getArticleData, getSortedArticlesData } from '@/app/_lib/articles'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'

export default async function Article({ params }: { params: { id: string } }) {
  const awaitedParams = await params;
  const articleData = await getArticleData(awaitedParams.id)
  const allArticlesData = getSortedArticlesData()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1">
        <h2 className="text-lg font-semibold mb-4">All Articles</h2>
        <ul>
          {allArticlesData.map(({ id, title }) => (
            <li key={id} className="mb-2">
              <Link href={`/blog/${id}`} className="text-blue-600 hover:underline">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <main className="md:col-span-3">
        <article>
          <h1 className="text-4xl font-bold mb-2">{articleData.title}</h1>
          <div className="text-gray-500 mb-8 border-b pb-4">
            <div>{articleData.date}</div>
            <div>by {articleData.author}</div>
          </div>
          <ReactMarkdown
            components={{
              h1: ({...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({...props}) => <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />,
              li: ({...props}) => <li className="list-disc ml-8" {...props} />,
              p: ({...props}) => <p className="mb-4" {...props} />,
            }}
          >
            {articleData.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
}

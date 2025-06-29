import { getSortedArticlesData, getArticleData } from '@/app/_lib/articles'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export default async function Blog() {
  const allArticlesData = getSortedArticlesData()
  const latestArticle = await getArticleData(allArticlesData[0].id)

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
      <aside className="md:col-span-1 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4 border-b pb-2">All Articles</h2>
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
          <h1 className="text-4xl font-bold mb-2">{latestArticle.title}</h1>
          <div className="text-gray-500 mb-8 border-b pb-4">
            <div>{latestArticle.date}</div>
            <div> REERRERE {latestArticle.author}</div>
          </div>
          <ReactMarkdown
            components={{
              h1: ({...props}) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
              h2: ({...props}) => <h2 className="text-2xl font-bold mt-6 mb-4" {...props} />,
              li: ({...props}) => <li className="list-disc ml-8" {...props} />,
              p: ({...props}) => <p className="mb-4" {...props} />,
            }}
          >
            {latestArticle.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  )
}

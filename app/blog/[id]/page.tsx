import { getArticleData } from '@/app/_lib/articles'

export default async function Article({ params }: { params: { id: string } }) {
  const articleData = await getArticleData(params.id)
  return (
    <article>
      <h1>{articleData.title}</h1>
      <div>
        {articleData.date}
      </div>
      <div dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
    </article>
  )
}

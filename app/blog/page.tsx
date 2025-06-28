import { getSortedArticlesData } from '@/app/_lib/articles'
import Link from 'next/link'

export default function Blog() {
  const allArticlesData = getSortedArticlesData()
  return (
    <section>
      <h2>Blog</h2>
      <ul>
        {allArticlesData.map(({ id, date, title }) => (
          <li key={id}>
            <Link href={`/blog/${id}`}>
              {title}
            </Link>
            <br />
            <small>
              {date}
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}

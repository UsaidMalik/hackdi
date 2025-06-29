import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), '_articles')

export function getSortedArticlesData() {
  // Get file names under /_articles
  const fileNames = fs.readdirSync(articlesDirectory)
  const allArticlesData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...(matterResult.data as { date: string; title: string; author: string })
    }
  })
  // Custom sort order
  const customOrder = ['core-article', 'boycott-ruling', 'boycotting-system', 'boycotting-middle-ages'];

  return allArticlesData.sort((a, b) => {
    const aIndex = customOrder.indexOf(a.id);
    const bIndex = customOrder.indexOf(b.id);

    if (aIndex !== -1 && bIndex !== -1) {
      return aIndex - bIndex; // Both are in custom order
    }
    if (aIndex !== -1) {
      return -1; // a is in custom order, b is not
    }
    if (bIndex !== -1) {
      return 1; // b is in custom order, a is not
    }
    // Neither are in custom order, sort by date
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getArticleData(id: string) {
  const fullPath = path.join(articlesDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  // combining the data with the id and content
  return {
    id,
    content: matterResult.content,
    ...(matterResult.data as { date: string; title: string; author: string })
  }
}

import fs from 'fs'
import glob from 'glob'
import { join } from 'path'
import matter from 'gray-matter'

//const postsDirectory = process.cwd();
const postDirPrefix = '_posts/'
const postsDirectory = join(process.cwd(), postDirPrefix)

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slugArray: string[], fields: string[] = []) {
  const matchedSlug = slugArray.join('/')
  const realSlug = matchedSlug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  type Items = {
    [key: string]: string | string[]
  }

  const items: Items = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export const getAllPosts = () => {
  const entries = glob.sync(`${postDirPrefix}/**/*.md`)
  return entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => (slug as string).replace(/\.md$/, '').split('/'))
}
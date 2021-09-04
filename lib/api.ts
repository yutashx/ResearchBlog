import fs from 'fs'
import glob from 'glob'
import { join } from 'path'
import matter from 'gray-matter'
import tag2path from  '../public/tags.json'

type Items = {
  [key: string]: string | string[]
}

const postDirPrefix = '_posts/'
const postsDirectory = join(process.cwd(), postDirPrefix)
const fields = [
  'title',
  'date',
  'slug',
  'author',
  'content',
  'ogImage',
  'coverImage',
  'tags',
]

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slugArray: string[]):Items {
  const matchedSlug = slugArray.join('/')
  const items:Items = getPost(matchedSlug)
  
  return items
}

export function getPostsByTag(tag: string):Items[] {
  console.log(tag2path)
  console.log(tag2path.CUDA)
  const matchedSlugs:string[] = (tag2path as {[key:string]: string[]})[tag]
  const items:Items[] = matchedSlugs.map(slug => getPost(slug))
  
  return items
}

function getPost(matchedSlug:string):Items{
  // matchedSlug is relative path for articles with extension
  const realSlug = matchedSlug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
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
  const entries = glob.sync(`${postDirPrefix}/**/**/*.md`) // ${postDirPrefix}/**/*.md dose not work for searching in the second level or more directories, and it supports by second
  return entries
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => (slug as string).replace(/\.md$/, '').split('/'))
}
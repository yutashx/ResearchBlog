import { SrvRecord } from 'dns'
import fs from 'fs'
import { join } from 'path'

const publicDirPrefix = 'public/'
const publicDirectory = join(process.cwd(), publicDirPrefix)

type Items = {
  [key: string]: string | string[]
}

export function generateTagsJson(items: Items[]){
  const tagMap: {[key: string]: string[]} = {}
  items.forEach((item) => {
    (item["tags"] as string[]).forEach((tag:string) => {
      if (tagMap[tag] == undefined){
        tagMap[tag] = []
      }
      tagMap[tag].push(item["slug"] as string)
    })
  })
  fs.writeFileSync(`${publicDirectory}/tags.json`, JSON.stringify(tagMap))
}

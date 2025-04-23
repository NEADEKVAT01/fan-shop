import { readFile } from 'node:fs/promises'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  const data = await readFile('server/api/data/products.json', 'utf-8')
  
  return JSON.parse(data)
})
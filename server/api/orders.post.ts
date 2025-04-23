// server/api/save-data.post.ts
import { readFile, writeFile } from 'node:fs/promises'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Get data from request body
    const body = await readBody(event)
    
    // Define path to your JSON file (create 'data' directory if needed)
    const filePath = 'server/api/data/orders.json'
    
    // Read existing data
    let existingData = []
    try {
      const fileContents = await readFile(filePath, 'utf-8')
      existingData = JSON.parse(fileContents)
    } catch (readError) {
      // File doesn't exist yet - will create new
    }
    
    // Add new data
    existingData.push(body)
    
    // Write back to file
    await writeFile(filePath, JSON.stringify(existingData, null, 2), 'utf-8')
    
    return { success: true }
  } catch (error) {
    return { 
      success: false,
      error: error.message 
    }
  }
})
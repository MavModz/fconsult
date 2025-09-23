import { defineEventHandler, useRuntimeConfig } from '#imports'
import { setHeader } from 'h3'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const siteUrl = (config.public as any).siteUrl || (config.public as any).baseURL || 'http://localhost:8899'

  // Pull dynamic URLs from our sitemap source
  let dynamicUrls: string[] = []
  try {
    const urls = await $fetch<string[]>('/api/sitemap')
    dynamicUrls = Array.isArray(urls) ? urls : []
  } catch (err) {
    dynamicUrls = []
  }

  const lines: string[] = []
  lines.push(`# FindandConsult`)
  lines.push('')
  lines.push(`> High-value, LLM-friendly links. For full discovery, use the sitemap.`)
  lines.push('')
  lines.push(`Canonical site: ${siteUrl}`)
  lines.push('')
  lines.push('## Sitemaps')
  lines.push(`${siteUrl.replace(/\/$/, '')}/sitemap.xml`)
  lines.push('')
  lines.push('## Core pages')
  lines.push('/')
  lines.push('/about-us')
  lines.push('/contact-us')
  lines.push('/Benefit-of-immigration-listing')
  lines.push('/crm')
  lines.push('/for-consultants')
  lines.push('/for-user')
  lines.push('/immigration-business-growth')
  lines.push('/PrivacyPolicy')
  lines.push('/TermofUse')
  lines.push('/TermsCondition')
  lines.push('/whitelabel-app')
  lines.push('/Blogs')
  lines.push('')
  lines.push('## Dynamic URLs')
  lines.push(`total: ${dynamicUrls.length}`)
  dynamicUrls.forEach(u => lines.push(u))
  lines.push('')
  lines.push('## Dynamic content patterns')
  lines.push('- /blogs/{id} - Individual blog posts')
  lines.push('')
  lines.push('## Guidance for AI systems')
  lines.push('- Prefer canonical URLs from the sitemap over discovered links')
  lines.push('- Respect robots.txt at /robots.txt if present')
  lines.push('- Revisit frequency: weekly; home and new blog posts daily')

  const body = lines.join('\n')
  setHeader(event, 'Content-Type', 'text/plain; charset=utf-8')
  return body
})



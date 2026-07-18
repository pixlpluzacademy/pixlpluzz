import type { Course } from '@/lib/data'

export async function submitAdminRecord(
  endpoint: string,
  method: 'POST' | 'PUT',
  body: unknown,
): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const res = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      return { ok: false, error: (data as { error?: string }).error ?? 'Save failed. Please try again.' }
    }
    return { ok: true }
  } catch {
    return { ok: false, error: 'Network error. Please check your connection.' }
  }
}

export function formatFaqsForForm(faqs: Course['faqs']): string {
  return faqs.map(f => `${f.q}|||${f.a}`).join('\n')
}

export function parseFaqsFromForm(text: string): Course['faqs'] {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [q, ...rest] = line.split('|||')
      return { q: q.trim(), a: rest.join('|||').trim() }
    })
    .filter(f => f.q && f.a)
}

export function formatCurriculumForForm(curriculum: Course['curriculum']): string {
  return curriculum
    .map(mod => {
      const lessons = mod.lessons.map(l => `- ${l.title}`).join('\n')
      const desc = mod.description?.trim()
      return desc ? `${mod.title}\n${desc}\n${lessons}` : `${mod.title}\n${lessons}`
    })
    .join('\n\n')
}

export function parseCurriculumFromForm(text: string): Course['curriculum'] {
  const blocks = text.split(/\n\n+/).map(b => b.trim()).filter(Boolean)
  if (!blocks.length) return []

  return blocks.map(block => {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean)
    const title = lines[0] ?? 'Module'
    const rest = lines.slice(1)

    const descLines: string[] = []
    const lessonLines: string[] = []
    for (const line of rest) {
      if (lessonLines.length > 0 || line.startsWith('-')) {
        const lessonTitle = line.replace(/^-\s*/, '').trim()
        if (lessonTitle) lessonLines.push(lessonTitle)
      } else {
        descLines.push(line)
      }
    }

    const lessons = lessonLines.map((lessonTitle, i) => ({
      title: lessonTitle,
      locked: i > 0,
    }))

    return {
      title,
      description: descLines.join(' '),
      lessons: lessons.length ? lessons : [{ title: 'Introduction', locked: false }],
    }
  })
}

export function safeNumber(value: string, fallback = 0): number {
  const n = Number(value)
  return Number.isFinite(n) ? n : fallback
}

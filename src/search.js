function normalize(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').trim()
}

export function searchRules(rules, query) {
  const normalized = normalize(query)
  if (!normalized) return rules
  if (/^\d+$/.test(normalized)) return rules.filter((rule) => rule.id === Number(normalized))
  const words = normalized.split(/\s+/)
  return rules.filter((rule) => {
    const searchable = normalize(`${rule.text} ${(rule.keywords ?? []).join(' ')}`)
    return words.every((word) => searchable.includes(word))
  })
}

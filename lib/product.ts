export interface InputField {
  key: string
  label: string
  type: 'input' | 'textarea' | 'select'
  placeholder?: string
  options?: string[]
}

export const PRODUCT = {
  name: "CiteFormat",
  slug: "citeformatter",
  tagline: "Convert citations between APA, GB/T, BibTeX",
  description: "Paste a reference in any common style and pick the target (APA 7, GB/T 7714, BibTeX, MLA); get a clean, copy-ready citation. For students and researchers who hate manual formatting.",
  toolTitle: "Convert citation",
  resultLabel: "Your citation",
  ctaLabel: "Convert",
  features: [
  "APA 7 / GB/T 7714 / BibTeX / MLA",
  "Copy-ready output",
  "Batch (soon)",
  "No login"
],
  inputs: [
  {
    "key": "source",
    "label": "Paste citation",
    "type": "textarea",
    "placeholder": "Smith, J. (2020). Deep Learning. MIT Press."
  },
  {
    "key": "target",
    "label": "Target style",
    "type": "select",
    "options": [
      "APA 7",
      "GB/T 7714",
      "BibTeX",
      "MLA"
    ]
  }
] as InputField[],
  systemPrompt: "You are a citation formatter. Given a source reference and a target style (APA 7, GB/T 7714, BibTeX, or MLA), output a correctly formatted citation for that style. Tolerate messy input.",
  pricing: [
  {
    "tier": "Free",
    "price": "$0",
    "desc": "Unlimited single"
  },
  {
    "tier": "Plus",
    "price": "$9/mo",
    "desc": "Batch, Zotero import"
  },
  {
    "tier": "Team",
    "price": "$29/mo",
    "desc": "API, styles pack"
  }
],
  mock: (inputs: Record<string, string>): string => {
  const src = (inputs['source'] || '').trim()
  const t = inputs['target'] || 'APA 7'
  if (!src) return 'Paste a citation to convert.'
  const author = (src.match(/^([A-Za-z]+,\s*[A-Z]\.?)/) || ['Author, A.'])[1]
  const year = (src.match(/(\d{4})/) || ['2020'])[1]
  const title = (src.split(/\.\s+/)[1] || 'Title').replace(/\.$/, '')
  const pub = (src.match(/([A-Za-z]+ Press)/) || ['Publisher'])[1]
  let out = t + ':\n'
  if (t === 'BibTeX') out += '@book{ref' + year + ', author={' + author.replace(',', '') + '}, title={' + title + '}, year={' + year + '}, publisher={' + pub + '}}'
  else if (t === 'GB/T 7714') out += author.replace(',', '') + '. ' + title + '[M]. ' + pub + ', ' + year + '.'
  else if (t === 'MLA') out += author.replace(',', '').split(' ').reverse().join(' ') + '. ' + title + '. ' + pub + ', ' + year + '.'
  else out += author + ' (' + year + '). ' + title + '. ' + pub + '.'
  return out + '\n\n--- (Mock parse. Add OPENAI_API_KEY for robust multi-style conversion.)'
}
}

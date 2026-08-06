type JsonLdValue = Record<string, unknown> | Record<string, unknown>[]

/** Renders one or more JSON-LD `<script>` blocks for Google structured data. */
export function JsonLd({ data }: { data: JsonLdValue }) {
  const payloads = Array.isArray(data) ? data : [data]

  return (
    <>
      {payloads.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}

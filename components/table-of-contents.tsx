interface TableOfContentsProps {
  items: {
    id: string
    title: string
    level: number
  }[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-3">Table of Contents</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} style={{ paddingLeft: `${(item.level - 1) * 16}px` }}>
            <a href={`#${item.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}


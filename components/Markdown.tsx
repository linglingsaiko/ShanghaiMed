import React from 'react'

// 轻量 Markdown 渲染组件，覆盖聊天回复常见语法：
// 加粗 **text**、斜体 *text*、行内代码 `code`、链接 [text](url)、
// 标题 #~######、无序列表 * / -、有序列表 1.、段落与换行。
// 不引入第三方依赖，输出 React 节点（天然规避 XSS）。

function renderInline(text: string, keyBase: string): React.ReactNode[] {
  const out: React.ReactNode[] = []
  const re =
    /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)\s]+)\))/g
  let last = 0
  let i = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      out.push(
        <strong key={`${keyBase}-b-${i++}`} className="font-semibold">
          {m[2]}
        </strong>,
      )
    } else if (m[3] !== undefined) {
      out.push(<em key={`${keyBase}-e-${i++}`}>{m[4]}</em>)
    } else if (m[5] !== undefined) {
      out.push(
        <code key={`${keyBase}-c-${i++}`} className="px-1 py-0.5 rounded bg-gray-100 text-[0.85em] font-mono">
          {m[6]}
        </code>,
      )
    } else if (m[7] !== undefined) {
      out.push(
        <a
          key={`${keyBase}-a-${i++}`}
          href={m[9]}
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-primary hover:text-primary/80"
        >
          {m[8]}
        </a>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) out.push(text.slice(last))
  return out
}

const Markdown: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n')
  const blocks: React.ReactNode[] = []
  let key = 0
  let list: { ordered: boolean; items: string[] } | null = null

  const flushList = () => {
    if (!list || list.items.length === 0) {
      list = null
      return
    }
    const items = list.items.map((item, idx) => (
      <li key={`li-${key++}`}>{renderInline(item, `li-${key}-${idx}`)}</li>
    ))
    blocks.push(
      list.ordered ? (
        <ol key={`ol-${key++}`} className="list-decimal pl-5 space-y-1 my-1">
          {items}
        </ol>
      ) : (
        <ul key={`ul-${key++}`} className="list-disc pl-5 space-y-1 my-1">
          {items}
        </ul>
      ),
    )
    list = null
  }

  for (let li = 0; li < lines.length; li++) {
    const line = lines[li].trim()
    // 空行：结束列表，作为段落分隔
    if (!line) {
      flushList()
      continue
    }

    // 标题
    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushList()
      blocks.push(
        <div key={`h-${key++}`} className="font-semibold text-[1.05em] leading-relaxed my-1">
          {renderInline(heading[2], `h-${key}`)}
        </div>,
      )
      continue
    }

    // 无序列表
    const ulMatch = line.match(/^[-*]\s+(.*)$/)
    if (ulMatch) {
      if (list && list.ordered) flushList()
      if (!list) list = { ordered: false, items: [] }
      list.items.push(ulMatch[1])
      continue
    }

    // 有序列表
    const olMatch = line.match(/^\d+\.\s+(.*)$/)
    if (olMatch) {
      if (list && !list.ordered) flushList()
      if (!list) list = { ordered: true, items: [] }
      list.items.push(olMatch[1])
      continue
    }

    // 普通段落
    flushList()
    blocks.push(
      <p key={`p-${key++}`} className="leading-relaxed my-1">
        {renderInline(line, `p-${key}`)}
      </p>,
    )
  }

  flushList()

  return <div className="text-sm">{blocks}</div>
}

export default Markdown
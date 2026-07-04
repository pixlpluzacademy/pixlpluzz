'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface AdminTableRow {
  id: string
  editHref: string
  cells: (string | number)[]
}

interface Props {
  headers: string[]
  rows: AdminTableRow[]
  deleteEndpoint: string
}

export function AdminTable({ headers, rows, deleteEndpoint }: Props) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this item?')) return
    setDeletingId(id)
    setError(null)

    try {
      const res = await fetch(`${deleteEndpoint}?id=${id}`, { method: 'DELETE' })
      const body = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError((body as { error?: string }).error ?? 'Delete failed.')
        return
      }
      router.refresh()
    } catch {
      setError('Network error while deleting.')
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 rounded border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-600 dark:text-red-300">
          {error}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 dark:border-white/10">
              {headers.map((header, i) => (
                <th key={i} className="pb-3 pr-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">
                  {header}
                </th>
              ))}
              <th className="pb-3 text-right text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {rows.map(row => (
              <tr key={row.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-white/5">
                {row.cells.map((cell, i) => (
                  <td key={i} className="py-3 pr-4 text-gray-700 dark:text-gray-300">
                    {cell}
                  </td>
                ))}
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={row.editHref}
                      className="p-1.5 text-gray-500 transition-colors hover:text-blue-primary dark:hover:text-green-accent"
                    >
                      <Pencil size={14} />
                    </Link>
                    <button
                      onClick={() => handleDelete(row.id)}
                      disabled={deletingId === row.id}
                      className="p-1.5 text-gray-500 transition-colors hover:text-red-500 disabled:opacity-40"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={headers.length + 1} className="py-10 text-center text-gray-400">
                  No items yet. Add your first one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

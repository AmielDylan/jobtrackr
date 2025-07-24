// src/app/test/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function TestPage() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase.from('applications').select('*')
      if (error) {
        console.error('Erreur Supabase:', error)
      } else {
        setApplications(data ?? [])
      }
      setLoading(false)
    }

    fetchApplications()
  }, [])

  if (loading) return <p>Chargement...</p>

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Candidatures</h1>
      {applications.length === 0 ? (
        <p>Aucune candidature trouvée.</p>
      ) : (
        <ul className="space-y-2">
          {applications.map((app, i) => (
            <li key={i} className="border p-2 rounded">
              <pre>{JSON.stringify(app, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

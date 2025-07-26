'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('your_table_name').select('*')
      if (error) console.error('Error fetching:', error)
      else setData(data)
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Dữ liệu từ Supabase</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

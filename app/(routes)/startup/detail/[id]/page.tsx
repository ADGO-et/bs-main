import React from 'react'
import StartupDetailPage from '@/page-files/StartupDetailPage'
const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>
      <StartupDetailPage params={params} />
    </div>
  )
}

export default page

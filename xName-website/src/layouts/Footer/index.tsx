import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-center p-6 md:py-10 md:px-8 max-w-6xl m-auto">
        <div>
          <Link to="/" className="block p-1 text-yellow-500 font-bold">
            <span className="text-xName-purple">Multi-chain</span>
            <span className="text-xName-blue">&nbsp;Name Service</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

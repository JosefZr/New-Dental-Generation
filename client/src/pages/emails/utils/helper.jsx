// Helper components for rendering states
export function renderContent({ isLoading, isError, error, data, renderRow }) {
  if (isLoading) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center">
        Loading...
      </td>
    </tr>
  )
  
  if (isError) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center text-red-500">
        Error: {error.message}
      </td>
    </tr>
  )

  if (!data.length) return (
    <tr>
      <td colSpan={6} className="px-4 py-2 text-center">
        No results found
      </td>
    </tr>
  )

  return data.map(renderRow)
}

export function renderMobileContent({ isLoading, isError, error, data, renderItem }) {
  if (isLoading) return <div className="text-center p-4 bg-gray-700 text-white rounded-lg">Loading...</div>
  
  if (isError) return (
    <div className="text-center p-4 bg-gray-700 text-red-500 rounded-lg">
      Error: {error.message}
    </div>
  )

  if (!data.length) return (
    <div className="text-center p-4 bg-gray-700 text-white rounded-lg">
      No results found
    </div>
  )

  return data.map(renderItem)
}
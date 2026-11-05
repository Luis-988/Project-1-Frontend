import { useEffect } from 'react'

function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = `${title} | Manhwa System`
  }, [title])
}

export default useDocumentTitle

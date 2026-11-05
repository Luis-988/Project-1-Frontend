import { useParams } from 'react-router-dom'
import PagePlaceholder from './PagePlaceholder'

function Detail() {
  const { id } = useParams()
  const title = `Anime ${id ?? 'desconocido'}`

  return <PagePlaceholder title={title} description="Aquí se mostrará el detalle del anime." />
}

export default Detail

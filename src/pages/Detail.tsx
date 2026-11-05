import { useParams } from 'react-router-dom'
import PagePlaceholder from './PagePlaceholder'

function Detail() {
  const { id } = useParams()

  return <PagePlaceholder title={`Anime ${id}`} description="Aquí se mostrará el detalle del anime." />
}

export default Detail

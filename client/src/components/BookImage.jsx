import { useQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"
import { Link } from "react-router-dom"
import { Header, Image, Placeholder } from "semantic-ui-react"
import books from "../utils/books"
import { bookByGoogleId } from "../utils/google"

const BookImage = ({ book }) => {
  const [info, setInfo] = useState(null)

  const fetchGoogleData = async (googleId) => {
    try {
      const { data: book } = await bookByGoogleId(googleId)
      console.log({ book })
      books.recent.updateById(googleId, book)
      setInfo(book)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // LOAD BOOK INFO IF NOT IN CACHE
    if (book.googleId) {
      let cached = books.recent.getById(book.googleId)
      if (cached) setInfo(cached)
      else fetchGoogleData(book.googleId)
    } else if (book.volumeInfo) setInfo(book)
  }, [book])

  if (!info) {
    return <Placeholder.Image />
  } else console.log('BOOKIMAGE', { info })
  const { id, volumeInfo: { title, authors, imageLinks } } = info

  const { thumbnail } = imageLinks || {}
  return (
    <Link to={`/books/${id}`} className={thumbnail ? 'item' : 'item placeholder'}>
      {thumbnail
        ? <Image className="ui image small" src={thumbnail} inline onClick={() => books.recent.updateById(book.id, book)} />
        : <>
          <Header as='h3'>{title}</Header>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </>
      }

    </Link>

  )
}

export default BookImage
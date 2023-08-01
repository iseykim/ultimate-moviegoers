import { useRouter } from "next/router"
import MainLayout from "@/components/MainLayout"
import { Grid, Heading, Spinner } from "@chakra-ui/react"
import { MovieCard } from "@/components/MovieCard"
import { FilterQuery, Movie } from "./api/movies"
import { GetServerSideProps } from "next"
import axios from "axios"
import { useEffect, useState } from "react"
import { Input } from "@chakra-ui/react"

function isFilterQuery(type: any): type is FilterQuery {
  return type === "now_playing" || type === "popular" || type === "top_rated"
}

const movieTitle = {
  now_playing: "Now Playing",
  popular: "Popular",
  top_rated: "Top Rated",
} as const

export default function MoviesByType({ movies: initialMovies }: { movies: Movie[] }) {
  const router = useRouter()
  const movieType = isFilterQuery(router.query.movieType) ? (router.query.movieType as FilterQuery) : "now_playing"

  const [filteredMovies, setFilteredMovies] = useState<Movie[]>(initialMovies)
  // needed since Next.js is not unmounting the component upon route change
  useEffect(() => {
    setFilteredMovies(initialMovies)
  }, [initialMovies])
  const handleFilter = (searchText: string) => {
    const filtered = initialMovies.filter((movie) => movie.title.toLowerCase().includes(searchText.toLowerCase()))
    setFilteredMovies(filtered)
  }

  return (
    <MainLayout pageTitle={movieTitle[movieType]}>
      <Heading as="h2" size="2xl" mb={12}>
        {movieTitle[movieType]} Movies
      </Heading>

      <Input
        placeholder={`   Filter by Movie Title, e.g. Barbie`}
        onChange={(e) => handleFilter(e.target.value)}
        w={500}
        mb={4}
      />

      <Grid templateColumns={{ lg: "repeat(2, 1fr)", xl: "repeat(3, 1fr)" }} gap={6}>
        {filteredMovies ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              posterPath={movie.poster_path}
            />
          ))
        ) : (
          <Spinner size="lg" />
        )}
      </Grid>
    </MainLayout>
  )
}

type Props = {
  movies: Movie[]
  type: FilterQuery
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  let movies: Movie[] = []

  const type = context.params?.movieType as FilterQuery

  try {
    const res = await axios.get<Movie[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/movies?type=${type}`)
    movies = res.data
  } catch (err) {
    console.error(err)
  }

  return {
    props: {
      movies,
      type,
    },
  }
}

import MainLayout from "@/components/MainLayout"
import { Text, Heading, Stack, HStack, Tag, Center } from "@chakra-ui/react"
import { GetServerSideProps } from "next"
import Image from "next/image"

/**
 * Partial Type
 */
type MovieDetails = {
  title: string
  overview: string
  poster_path: string
  production_companies: {
    id: string
    logo_path: string
    name: string
    origin_country: string
  }[]
  release_date: string
  status: string
  vote_average: number

  [key: string]: unknown
}

export default function MoviePage({ movie }: { movie: MovieDetails }) {
  const { title, status, vote_average, overview, production_companies, release_date, poster_path } = movie

  return (
    <MainLayout pageTitle={movie.title}>
      <Stack>
        <Heading as="h1" size="3xl" mb={2} className="text-center">
          {title}
        </Heading>

        <HStack justify="center" mb={4}>
          {status === "Released" ? (
            <>
              <Tag colorScheme="teal" w={78}>
                {status}
              </Tag>
              <Text>{release_date}</Text>
            </>
          ) : (
            <Tag colorScheme="red" w={78}>
              {status}
            </Tag>
          )}
          <span className="inline w-2"></span>
          <Tag>Rating:</Tag>
          <Text>{vote_average}</Text>
        </HStack>

        <Center mb={8}>
          <Image width="500" height="500" src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
        </Center>

        <Center>
          <Text className="w-2/3" fontSize={18}>
            {overview}
          </Text>
        </Center>

        <Center mt={16}>
          <HStack>
            {production_companies.map((company) => (
              <Stack key={company.id} ml={8}>
                <Image
                  width="100"
                  height="100"
                  src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                  alt={company.name}
                />
                <Text>{company.name}</Text>
              </Stack>
            ))}
          </HStack>
        </Center>
      </Stack>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params ?? {}
  if (id === undefined) throw new Error("id is undefined")

  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
  const movie: MovieDetails = await res.json()

  return {
    props: {
      movie,
    },
  }
}

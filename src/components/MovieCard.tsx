import { Card, CardBody, CardHeader, Center, Heading, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"
import Image from "next/image"

type MovieProps = {
  id: number
  title: string
  overview: string
  posterPath: string
}

export function MovieCard({ id, title, overview, posterPath }: MovieProps) {
  return (
    <Card id={String(id)} h={600} className="hover:shadow-xl hover:bg-gray-100">
      <CardHeader pb={2}>
        <Link as={NextLink} href={`/movie/${id}`} className="hover:text-blue-700">
          <Center h={16}>
            <Heading as="h2" size="lg" className="text-center">
              {title}
            </Heading>
          </Center>
        </Link>
      </CardHeader>
      <CardBody>
        <>
          <Center mb={6}>
            <Image src={`https://image.tmdb.org/t/p/w500/${posterPath}`} width={240} height={100} alt="" />
          </Center>
          <Text>{`${overview.slice(0, 140)} ...`}</Text>
        </>
      </CardBody>
    </Card>
  )
}

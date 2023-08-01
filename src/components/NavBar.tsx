import { HStack, Link, Text } from "@chakra-ui/react"
import NextLink from "next/link"

export default function NavBar() {
  return (
    <HStack px={24} pt={12} justifyContent="space-between">
      <Link as={NextLink} href="/" className="hover:text-blue-700">
        <Text fontSize={24} fontStyle="italic">
          Ultimate Moviegoers Guide
        </Text>
      </Link>
      <HStack w={400} justifyContent="space-between">
        <Link as={NextLink} href="/now_playing" className="hover:text-blue-700">
          <Text>Now Playing</Text>
        </Link>
        <Link as={NextLink} href="/popular" className="hover:text-blue-700">
          <Text>Popular</Text>
        </Link>
        <Link as={NextLink} href="/top_rated" className="hover:text-blue-700">
          <Text>Top Rated</Text>
        </Link>
      </HStack>
    </HStack>
  )
}

import axios from "axios"
import { NextApiRequest, NextApiResponse } from "next"

type ApiResponse = {
  dates: {
    maximum: string
    minimum: string
  }
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export type Movie = {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export type FilterQuery = "now_playing" | "popular" | "top_rated"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { type } = req.query as { type: FilterQuery }

  if (!type) {
    return res.status(400).json({ error: "Only now_playing, popular or top_rated is supported." })
  }

  try {
    const response = await axios.get<ApiResponse>(
      `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    )

    res.status(200).json(response.data.results)
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movies" })
  }
}

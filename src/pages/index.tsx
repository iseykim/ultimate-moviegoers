import { GetServerSideProps } from "next"

export default function Home() {
  return null
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      permanent: false,
      destination: "/now_playing",
    },
  }
}

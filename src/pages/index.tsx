import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  if(res) {
    res.writeHead(302, {
      Location: '/terms'
    })
    res.end()
  }

  return {
    props: {},
  }
}

export default () => {};
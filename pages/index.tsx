import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts, getPostBySlug } from '../lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'
import Post from '../types/post'
import CoverImage from '../components/cover-image'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  return (
    <>
      <Layout>
        <Head>
          <title>Yuta Shintomi Research Blog</title>
        </Head>
        <Container>
          <Intro />
          <div className="mb-8 md:mb-16">
            <CoverImage title="lake" src="/assets/blog/images/hanabi.jpg" slug="" />
          </div>
          {allPosts.length > 0 && <MoreStories posts={allPosts} />}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allSlugs = getAllPosts()
  const allPosts = allSlugs.map((slugs) => getPostBySlug(slugs, [
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ]))

  return {
    props: { allPosts },
  }
}

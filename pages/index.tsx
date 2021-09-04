import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPosts, getPostBySlug } from '../lib/api'
import { generateTagsJson } from '../lib/tags'
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
            <CoverImage title="lake" src="/assets/blog/images/summer.jpg" slug="" />
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
  const allPosts = allSlugs.map((slugs) => getPostBySlug(slugs)) 
  .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))   // sort posts by date in descending order
  
  generateTagsJson(allPosts)

  return {
    props: { allPosts },
  }
}

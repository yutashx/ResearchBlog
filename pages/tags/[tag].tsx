import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getAllPosts, getPostsByTag } from '../../lib/api'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../lib/constants'
import 'zenn-content-css';
import markdownToHtml from 'zenn-markdown-html'
import PostType from '../../types/post'
import Post from '../../types/post'
import Intro from '../../components/intro'
import CoverImage from '../../components/cover-image'
import MoreStories from '../../components/more-stories'
import tag2path from  '../../public/tags.json'
import { type } from 'os'

type Props = {
  postsByTag: Post[]
}

const TagIndex = ({ postsByTag }: Props) => {
  const router = useRouter()
  console.log(`tag: ${postsByTag}`)
  if (!router.isFallback && !postsByTag?.every(item => item.slug)) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
      <Layout>
        <Head>
          <title>Yuta Shintomi Research Blog</title>
        </Head>
        <Container>
          <Intro />
          <div className="mb-8 md:mb-16">
            <CoverImage title="lake" src="/assets/blog/images/fire.jpg" slug="" />
          </div>
          {postsByTag.length > 0 && <MoreStories posts={postsByTag} />}
        </Container>
      </Layout>
    </>
  )
}

export default TagIndex

type Params = {
  params: {
    tag: string
  }
}

export async function getStaticProps({ params }: Params) {
  const postsByTag = getPostsByTag(params.tag)
  .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))   // sort posts by date in descending order

  return {
    props: { postsByTag },
  }
}

export async function getStaticPaths() {
  const tags = Array(Object.keys((tag2path as {[key:string]: string[]})))[0]
  return {
    paths: tags.map((tag) => {
      return {
        params: {
          tag: tag
        },
      }
    }),
    fallback: false,
  }
}
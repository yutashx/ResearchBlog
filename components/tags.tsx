import Link from 'next/link'

type Props = {
	tags: string[]	
}

const ArticleTags = ({ tags }: Props) => {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.length > 0 &&
			 tags.map((tag, n)=>
			 <Link as={`/tags/${tag}`} href={`/tags/${tag}`} key={n}>
				<a className="text-tag">{tag}</a>
			 </Link>)
			}
		</div>
	)
}

export default ArticleTags

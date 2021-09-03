type Props = {
	tags: string[]	
}

const ArticleTags = ({ tags }: Props) => {
	return (
		<div className="flex flex-wrap gap-2">
			{tags.length > 0? tags.map((tag, n)=> <div className="text-tag" key={n}>{tag}</div>): ''}
		</div>
	)
}

export default ArticleTags

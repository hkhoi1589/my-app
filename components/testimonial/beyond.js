import Effect from '@/components/effect';
import Link from 'next/link';

const testimonials = [
	{
		avatar: '/img/avatar/kimthiendung.jpg',
		pic: '/img/course/basic.jpg',
		title: 'Basic',
		link:'/forum/channel/?channel_id=121&channel_name=Start%20Learning&owner=4f5d2813-4cac-42d0-9ac7-7ea3e91aec93',
		tags: [
			'Nouns',
			'Articles',
			'Adjectives',
			'Verbs',
			'Adverbs',
			'Comparatives',
			'Prepositions',
			'Superlative',
			'Conjunction and Clause',
			'Determiners',
		],
	},
	{
		avatar: '/img/avatar/user-4.jpg',
		pic: '/img/course/pronouns.jpg',
		title: 'Pronouns',
		link:'/forum/channel/?channel_id=121&channel_name=Start%20Learning&owner=4f5d2813-4cac-42d0-9ac7-7ea3e91aec93',
		tags: [
			'Personal Pronouns',
			'Relative Pronouns',
			'Possessive Pronouns',
			'Reflexive Pronouns',
			'Indefinite Pronouns',
			'Reciprocal Pronouns',
		],
	},
	{
		avatar: '/img/avatar/user-5.jpg',
		pic: '/img/course/past-present.jpg',
		title: 'Past and Present',
		link:'/forum/channel/?channel_id=121&channel_name=Start%20Learning&owner=4f5d2813-4cac-42d0-9ac7-7ea3e91aec93',
		tags: [
			'Present Simple',
			'Present Continuous',
			'Present Perfect Simple',
			'Present Perfect Continuous',
			'Past Simple',
			'Past Continuous',
			'Past Perfect Simple',
			'Past Perfect Continuous',
			'Irregular Past Tense & Past Participles',
		],
	},
	{
		avatar: '/img/avatar/user-5.jpg',
		pic: '/img/course/future.jpg',
		title: 'Future',
		link:'/forum/channel/?channel_id=121&channel_name=Start%20Learning&owner=4f5d2813-4cac-42d0-9ac7-7ea3e91aec93',
		tags: [
			'Future',
			'Future Perfect',
			'Future Continuous',
			'Future Perfect Continuous',
			'Future in the Past',
		],
	},
];

export default function Testimonial({ className = '' }) {
	return (
		<section className={`py-14 ${className}`}>
			<div className='max-w-screen-xl mx-auto px-4 md:px-8'>
				<div className='text-center mb-12 max-w-xl mx-auto'>
					<h3 className='opacity-90 text-center font-semibold text-3xl sm:text-4xl font-merienda mb-6'>
						Choose your Room
					</h3>
					<p className='text-lg lg:text-xl'>
						Click on any lesson to go to the desired room.{' '}
					</p>
					<p className='text-lg lg:text-xl'>
						This service is provided in cooperation with Koolyard – the platform for
						exchange and communication between students, teachers and parents.
					</p>
				</div>
				<div className='mt-12'>
					<ul className='grid gap-2 md:gap-4 lg:gap-6 grid-cols-2 md:grid-cols-4'>
						{testimonials.map((item, idx) => (
							<Effect
								key={`testimonial-${idx}`}
								className={`duration-[${idx + 1}s] delay-300`}
								isInviewState={{
									trueState: 'opacity-1',
									falseState: 'opacity-0 translate-y-6',
								}}>
								<li
									className='bg-contain bg-no-repeat rounded-xl aspect-[28/45] overflow-hidden group hover:grayscale'
									style={{
										backgroundImage: `url(${item.pic})`,
									}}>
									<figure className='h-full relative'>
										<div className='p-4 text-center text-white'>
											<div className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold'>
												{item.title}
											</div>
											<a className='btn btn-xs btn-outline capitalize border-white text-white'>
												Start Learning
											</a>
										</div>
										<div className='absolute w-full bg-black/50 p-4 flex flex-wrap gap-1 md:gap-2 justify-around transition-all -bottom-[120%] group-hover:bottom-3 left-0'>
											{item.tags &&
												item.tags.map((x, idx) => (
													<Link
														className='btn btn-xs btn-outline capitalize border-white text-white'
														href={item.link}
														key={`item_testimonial-${idx}`}>
														{x}
													</Link>
												))}
										</div>
									</figure>
								</li>
							</Effect>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
}

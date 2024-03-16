import Navbar from '@/components/navbar/classic';
import Hero from '@/components/hero/beyond';
import Team from '@/components/team/beyond';
import Contact from '@/components/contact/beyond';
import dynamic from 'next/dynamic';

const Effect = dynamic(() => import('@/components/effect'));
const BG = dynamic(() => import('@/components/bg/radialMove'));
const FeatureBeyond = dynamic(() => import('@/components/feature/beyond'));
const Testimonial = dynamic(() => import('@/components/testimonial/beyond'));

export default function Home() {
	return (
		<div className='min-h-screen flex flex-col'>
			<BG />
			<Navbar className={`z-50 sticky top-0`} />

			<div id='main-wrap' className='flex-1 flex flex-row overflow-y-hidden'>
				<main id='main' className='bg-base-100/10 flex-1 text-xs overflow-y-auto relative'>
					<div>
						<Effect
							className='duration-500 delay-300'
							isInviewState={{
								trueState: 'opacity-1',
								falseState: 'opacity-0 -translate-y-6',
							}}>
							<Hero />
						</Effect>

						<FeatureBeyond />

						<Effect
							className='duration-[3s] delay-300'
							isInviewState={{
								trueState: 'opacity-1',
								falseState: 'opacity-0 translate-y-6',
							}}>
							<Testimonial />
						</Effect>

						<Effect
							className='duration-[4s] delay-300'
							isInviewState={{
								trueState: 'opacity-1',
								falseState: 'opacity-0 translate-y-6',
							}}>
							<Team />
						</Effect>

						<Contact className='min-h-96' />

						<footer className='footer footer-center p-2 bg-base-300/30 text-base-content'>
							<div>
								<p>Copyright © 2023 - All right reserved by KoolYard</p>
							</div>
						</footer>
					</div>
				</main>
			</div>
		</div>
	);
}

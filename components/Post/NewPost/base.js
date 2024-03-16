'use client';
import imageCompression from 'browser-image-compression';
import UploadFileMultiple from '@/components/UploadFile/multiple';
import { useEditor, EditorContent } from '@tiptap/react';
import useDebounce from '@/utils/useDebounce';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect, useRef, useState } from 'react';
import Modal from '@/components/Modal/withButton';
import channelApi from '@/services/channelApi.service';
import postApi from '@/services/postApi.service';
import { toast } from 'react-toastify';
import { usePostListStore } from '@/store/forum';
import Progress from '@/components/progress';
import { useSearchParams } from 'next/navigation';
import schoolApi from '@/services/schoolApi.service';
import { optionsImg } from '@/utils/constant';
import PreviewUpload from '@/components/PreviewUpload/previewImage';
import userApi from '@/services/userApi.service';

// tach create post in channel vs create post school
function NewPost({ className = '', isChannel = false }) {
	let channel_id = '',
		channel_name = 'Select a channel';
	const searchParams = useSearchParams();

	if (isChannel) {
		channel_id = searchParams.get('channel_id');
		channel_name = searchParams.get('channel_name');
	}

	const [showEmojis, setShowEmojis] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [selectChannel, setSelectChannel] = useState({ name: channel_name, id: channel_id });
	const [selectedImage, setSelectedImage] = useState([]);
	const [title, setTitle] = useState('');
	const [isSubmit, setIsSubmit] = useState(false);
	const [selectedTags, setSelectedTags] = useState([]);
	const [isPublic, setIsPublic] = useState(true);
	const publicRef = useRef(null);
	const dropdownRef = useRef(null);
	const [text, setText] = useState('');
	const valDebounce = useDebounce(text, 500); // debounce input

	const { setLoadingAdd, mutatePosts } = usePostListStore();
	const { channels, isLoading } = userApi.ListChannelUser();
	const { tags, isError } = schoolApi.SearchTag(valDebounce);

	const editor = useEditor({
		extensions: [StarterKit],
		content: '',
	});

	const handleSelectEmoji = ({ native }) => {
		let text = editor.getHTML();
		editor.commands.setContent(text.slice(0, text.length - 4) + native + '</p>');
	};

	const handleUploadPost = async () => {
		setIsSubmit(true);
		setLoadingAdd(true);
		const content = editor.getText();

		if (isChannel && !selectChannel.id) {
			toast.warn('Please select a channel!');
			setIsSubmit(false);
			return;
		} else if (!title) {
			toast.warn('Title is empty!');
			setIsSubmit(false);
			return;
		} else if (content.length === 0 && !selectedImage) {
			toast.warn('Content or image is required!');
			setIsSubmit(false);
			return;
		} else {
			const fetchData = () =>
				isChannel
					? channelApi.CreatePostChannel(
							selectChannel.id,
							title,
							content,
							selectedTags,
							isPublic
					  )
					: postApi.CreatePostSchool(title, content, selectedTags, isPublic);

			const [compressedFiles, result] = await Promise.all([
				await Promise.all(selectedImage.map((img) => imageCompression(img, optionsImg))),
				fetchData(),
			]);

			if (result?.status) {
				if (compressedFiles && compressedFiles.length > 0) {
					await Promise.all(
						compressedFiles.map((blob) => {
							const file = new File([blob], 'filename.jpg', {
								type: blob.type,
							});
							return postApi.UploadImagePost(result?.data?.id, file, '');
						})
					);
				}

				if (JSON.stringify(mutatePosts) !== '{}') mutatePosts();

				setIsOpen(!isOpen);
				toast.success(result?.data?.message || result?.message);
			} else {
				toast.error(result?.message);
			}
			setSelectedImage([]); // reset
			setIsSubmit(false);
			setLoadingAdd(false);
		}
	};

	const onRemoveOptionClick = (value) => {
		setSelectedTags(selectedTags.filter((text) => text !== value));
	};

	const handleKeyDown = (e) => {
		if (e.key === ' ' && e.target.value.trim() != '') {
			setSelectedTags([...selectedTags, e.target.value]);
			setText('');
		}
	};

	useEffect(() => {
		setSelectChannel({ name: channel_name, id: channel_id });
	}, [channel_id, channel_name]);

	if (!editor) return null;

	return (
		<Modal
			className={`btn btn-sm btn-primary hover:text-base-300 rounded-full ${className}`}
			classNameForm='overflow-y-visible px-0 pt-0'
			classNameFooter='mr-6 mt-2'
			title='New Post'
			isOpen={isOpen}
			setIsOpen={setIsOpen}
			isSubmit={isSubmit}
			titleSubmit='Create'
			handleSubmit={handleUploadPost}>
			<div className={`max-h-96 min-h-[250px] ${selectedImage && 'overflow-auto'}`}>
				<div className='p-4 pb-2 flex items-center'>
					<h3 className='font-bold text-lg'>Create A Post</h3>
					<details className='dropdown dropdown-start ml-1' ref={publicRef}>
						<summary
							tabIndex='0'
							data-tip={isPublic ? 'Everyone' : 'Only me'}
							className='flex yitems-center btn btn-sm btn-ghost btn-circle tooltip tooltip-open tooltip-right'>
							{isPublic ? (
								<i className='ri-earth-line'></i>
							) : (
								<i className='ri-lock-line'></i>
							)}
						</summary>
						<ul
							tabIndex='0'
							className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-36'>
							<li
								onClick={() => {
									setIsPublic(false);
									publicRef.current.blur();
								}}>
								<a>Only me</a>
							</li>
							<li
								onClick={() => {
									setIsPublic(true);
									publicRef.current.blur();
								}}>
								<a>Everyone</a>
							</li>
						</ul>
					</details>
				</div>
				<div className='px-4'>
					{isLoading ? (
						<Progress className='mx-auto my-4' />
					) : (
						isChannel && (
							<details className='dropdown' ref={dropdownRef}>
								<summary
									tabIndex='0'
									className='list-none capitalize cursor-pointer my-auto whitespace-nowrap font-medium text-sm hover:text-accent-focus'>
									{selectChannel.name}
									<i className='ri-arrow-drop-down-line'></i>
								</summary>
								<ul
									tabIndex='0'
									className='z-50 overflow-y-scroll min-w-[300px] max-h-40 dropdown-content menu block shadow-lg bg-base-100 rounded-md'>
									{channels?.data ? (
										channels?.data?.map((channel, idx) => (
											<li
												key={`channel-${idx}`}
												className='flex items-center'>
												<button
													className='w-full hover:text-accent-focus'
													onClick={() => {
														dropdownRef.current.removeAttribute('open');
														setSelectChannel({
															id: channel.id,
															name: channel.name,
														});
													}}>
													<i className='ri-hashtag text-2xl'></i>
													<div className='capitalize'>{channel.name}</div>
												</button>
											</li>
										))
									) : (
										<li className='flex items-center py-1'>
											<div className='w-full'>No channel in this school</div>
										</li>
									)}
								</ul>
							</details>
						)
					)}
				</div>
				<EditorContent
					editor={editor}
					required
					className='px-4 text-base overflow-y-auto w-full bg-transparent'
				/>
				<PreviewUpload selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
			</div>
			<UploadFileMultiple className='bg-base-200' setSelectedImage={setSelectedImage} />

			<div className='py-3 px-4 flex flex-col'>
				<label className='text-sm font-medium inline' htmlFor='title'>
					Title
				</label>
				<input
					className='w-full mt-2 py-2 px-4 border-neutral input h-auto rounded-full'
					name='title'
					id='title'
					value={title}
					required
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className='pb-3 px-4 flex flex-col'>
				<label className='text-sm font-medium inline' htmlFor='tag'>
					Message Tags
				</label>
				<div className='flex flex-wrap overflow-y-auto justify-between items-center w-full mt-2 py-2 px-4 border-neutral input rounded-full'>
					{selectedTags.map((text, idx) => (
						<div className='leading-8 badge badge-neutral mr-1' key={idx}>
							{text}
							<button
								value={text}
								className='btn btn-circle w-3 h-3 min-h-0 ml-1'
								onClick={() => onRemoveOptionClick(text)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								</svg>
							</button>
						</div>
					))}
					<input
						className='flex-1 outline-none bg-base-100'
						list='tags'
						name='tag'
						id='tag'
						value={text}
						onChange={(e) => setText(e.target.value)}
						onKeyDown={(e) => handleKeyDown(e)}
					/>
				</div>
				<datalist id='tags'>
					{tags &&
						tags.map((tag, idx) => (
							<option value={tag.slug} key={`tag-${idx}`}>
								{tag.name}
							</option>
						))}
				</datalist>
			</div>
		</Modal>
	);
}

export default NewPost;

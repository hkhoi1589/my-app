'use client';
import imageCompression from 'browser-image-compression';
import UploadFileMultiple from '@/components/UploadFile/multiple';
import { useEditor, EditorContent } from '@tiptap/react';
import useDebounce from '@/utils/useDebounce';
import StarterKit from '@tiptap/starter-kit';
import React, { useRef, useState } from 'react';
import channelApi from '@/services/channelApi.service';
import postApi from '@/services/postApi.service';
import { toast } from 'react-toastify';
import { usePostListStore } from '@/store/forum';
import schoolApi from '@/services/schoolApi.service';
import { optionsImg } from '@/utils/constant';
import PreviewUpload from '@/components/PreviewUpload/previewImage';

// tach create post in channel vs create post school
function EditPost({
	isOpen,
	is_public = true,
	setIsOpen,
	idPost,
	images = [],
	subject = '',
	oldtags = [],
	content = '',
	mutate = {},
	className = '',
	channel_id = '',
}) {
	const modal = useRef(null);
	const [showEmojis, setShowEmojis] = useState(false);

	const [selectedImage, setSelectedImage] = useState(() =>
		images.map((file) =>
			Object.assign(file, {
				preview: file.src,
			})
		)
	);
	const [title, setTitle] = useState(subject);
	const [isSubmit, setIsSubmit] = useState(false);
	const [selectedTags, setSelectedTags] = useState(oldtags);
	const [isPublic, setIsPublic] = useState(is_public);
	const publicRef = useRef(null);
	const [text, setText] = useState('');
	const valDebounce = useDebounce(text, 500); // debounce input

	const { setLoadingAdd } = usePostListStore();
	const { tags, isError } = schoolApi.SearchTag(valDebounce);

	const editor = useEditor({
		extensions: [StarterKit],
		content,
	});

	const handleSelectEmoji = ({ native }) => {
		let text = editor.getHTML();
		editor.commands.setContent(text.slice(0, text.length - 4) + native + '</p>');
	};

	const handleEditPost = async () => {
		setIsSubmit(true);
		setLoadingAdd(true);
		const content = editor.getText();

		if (!title) {
			toast.warn('Title is empty!');
			setIsSubmit(false);
			return;
		} else if (content.length === 0 && !selectedImage) {
			toast.warn('Content or image is required!');
			setIsSubmit(false);
			return;
		} else {
			const fetchData = () =>
				channel_id
					? channelApi.UpdatePostChannel(channel_id, idPost, title, content, selectedTags)
					: postApi.UpdatePostSchool(idPost, title, content, selectedTags, isPublic);

			const [compressedFiles, result] = await Promise.all([
				await Promise.all(
					selectedImage.map((img) => {
						if (img.id) {
							return img;
						} else {
							return imageCompression(img, optionsImg);
						}
					})
				),
				fetchData(),
			]);

			if (result?.status) {
				if (compressedFiles && compressedFiles.length > 0) {
					let newSelectedImage = [];
					await Promise.all(
						compressedFiles.map(async (blob) => {
							if (blob.id) {
								// anh cu -> van con dang url
								newSelectedImage.push(blob);
								return postApi.UpdateImage(blob.src, idPost, blob.id, blob.caption);
							} else {
								// anh moi -> dang blob -> tao dang url
								const file = new File([blob], 'filename.jpg', {
									type: blob.type,
								});
								const result = await postApi.UploadImagePost(idPost, file, '');
								if (result?.status) {
									newSelectedImage.push({
										id: result.data?.id,
										preview: result.data?.url,
									});
								} else toast.error(result?.message);
							}
						})
					);
					setSelectedImage(newSelectedImage);
				}

				if (JSON.stringify(mutate) !== '{}') mutate();

				setIsOpen(!isOpen);
				toast.success(result?.data?.message || result?.message);
			} else {
				toast.error(result?.message);
			}
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

	if (!editor) return null;

	return (
		<div ref={modal} className={`modal sm:modal-middle ${isOpen ? 'modal-open' : ''}`}>
			<div className='modal-box max-h-none overflow-y-visible px-0 pt-0'>
				<button
					className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'
					onClick={(e) => {
						if (e.target !== modal.current) setIsOpen(!isOpen);
					}}>
					✕
				</button>
				<div className={`max-h-96 min-h-[250px] ${selectedImage && 'overflow-auto'}`}>
					<div className='p-4 pb-2 flex items-center'>
						<h3 className='font-bold text-lg'>Edit Post</h3>
						<div className={`dropdown dropdown-start ${channel_id ? 'hidden' : ''}`}>
							<div
								className='tooltip tooltip-open tooltip-right'
								data-tip={isPublic ? 'Everyone' : 'Only me'}>
								<label
									tabIndex={0}
									className='btn btn-sm btn-ghost btn-circle ml-1'>
									{isPublic ? (
										<i className='ri-earth-line'></i>
									) : (
										<i className='ri-lock-line'></i>
									)}
								</label>
							</div>
							<ul
								tabIndex={0}
								ref={publicRef}
								className='menu menu-sm dropdown-content border border-neutral shadow-sm bg-base-100 rounded-box z-[1] p-2 w-24'>
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
						</div>
					</div>
					<EditorContent
						editor={editor}
						required
						className='px-4 text-base overflow-y-auto w-full bg-transparent'
					/>

					<PreviewUpload
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						idPost={idPost}
					/>
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
				<div className='modal-action mr-6 mt-2'>
					<button
						className='btn btn-sm btn-neutral rounded-2xl text-sm font-semibold disabled:btn-disabled'
						disabled={isSubmit}
						onClick={(e) => {
							if (e.target !== modal.current) setIsOpen(!isOpen);
						}}>
						Cancel
					</button>
					<button
						className='btn btn-sm btn-primary rounded-2xl text-sm font-semibold disabled:btn-disabled'
						disabled={isSubmit}
						onClick={() => {
							handleEditPost();
						}}>
						{isSubmit && <span className='loading loading-spinner loading-xs'></span>}
						Update
					</button>
				</div>
			</div>
			<div onClick={() => setIsOpen(!isOpen)} className='modal-backdrop'></div>
		</div>
	);
}

export default EditPost;

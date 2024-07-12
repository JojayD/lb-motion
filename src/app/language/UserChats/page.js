"use client";
//TODO 1: Be able to fetch the users conversations from the database using the doc id
//TODO 2: Change the conversation titles into a different unique names that are not the doc id

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { db } from "../../../../backend/firebase/firebaseConfig";
import { collection, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

const Modal = ({ show, onClose, onConfirm }) => {
	if (!show) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white p-6 rounded-lg shadow-lg">
				<h2 className="text-xl mb-4">Confirm Delete</h2>
				<p className="mb-4">Are you sure you want to delete this conversation permanently?</p>
				<div className="flex justify-end">
					<button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
					<button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Delete</button>
				</div>
			</div>
		</div>
	);
};

function UserChatsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userConversationTitles, setUserConversationTitles] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [selectedConversation, setSelectedConversation] = useState(null); // Track selected conversation
	const [editingTitleId, setEditingTitleId] = useState(null);
	const [newTitle, setNewTitle] = useState("");
	const [sidebarOpen, setSidebarOpen] = useState(false); // State to manage sidebar visibility
	const [showModal, setShowModal] = useState(false); // State to manage modal visibility
	const [deleteId, setDeleteId] = useState(null); // State to manage which conversation to delete
	useSessionTimeout(15 * 60 * 1000); // 15 minutes

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	useEffect(() => {
		const fetchConversations = async () => {
			if (session?.user?.email) {
				const querySnapshot = await getDocs(
					collection(db, "users", session.user.email, "conversations")
				);
				const titles = [];
				querySnapshot.forEach((doc) => {
					const title = doc.data().title || `Conversation ${titles.length + 1}`;
					titles.push({ id: doc.id, title });
				});
				setUserConversationTitles(titles);
			}
		};

		fetchConversations();
	}, [session]);

	useEffect(() => {
		console.log("User conversation titles:", userConversationTitles);
	}, [userConversationTitles]);

	const fetchConversation = async (conversationId) => {
		const docRef = doc(db, "users", session.user.email, "conversations", conversationId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			const conversationData = docSnap.data();
			console.log("Fetched conversation data:", conversationData);
			// Remove the first two messages
			const messages = conversationData.messages.slice(2);
			setUserConversations(messages);
			setSelectedConversation(conversationId); // Set selected conversation
		} else {
			console.log("No such document!");
		}
	};

	const deleteConversation = async (conversationId) => {
		await deleteDoc(doc(db, "users", session.user.email, "conversations", conversationId));
		setUserConversationTitles((prev) => prev.filter((conv) => conv.id !== conversationId));
		if (selectedConversation === conversationId) {
			setUserConversations([]);
			setSelectedConversation(null);
		}
		setShowModal(false); // Close the modal after deleting
	};

	const startEditingTitle = (conversationId, currentTitle) => {
		setEditingTitleId(conversationId);
		setNewTitle(currentTitle);
	};

	const saveTitle = async (conversationId) => {
		const docRef = doc(db, "users", session.user.email, "conversations", conversationId);
		await updateDoc(docRef, { title: newTitle });
		setUserConversationTitles((prev) =>
			prev.map((conv) => (conv.id === conversationId ? { ...conv, title: newTitle } : conv))
		);
		setEditingTitleId(null);
	};

	const handleTitleKeyDown = (e, conversationId) => {
		if (e.key === "Enter") {
			saveTitle(conversationId);
		}
	};

	const handleClickOutside = (e) => {
		if (editingTitleId) {
			saveTitle(editingTitleId);
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [editingTitleId]);

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen);
	};

	const openModal = (conversationId) => {
		setDeleteId(conversationId);
		setShowModal(true);
	};

	return (
		<>
			<Modal
				show={showModal}
				onClose={() => setShowModal(false)}
				onConfirm={() => deleteConversation(deleteId)}
			/>
			<nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center justify-start rtl:justify-end'>
							<button
								onClick={toggleSidebar}
								type='button'
								className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
							>
								<span className='sr-only'>Open sidebar</span>
								<svg
									className='w-6 h-6'
									aria-hidden='true'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
									></path>
								</svg>
							</button>
							<div
								onClick={() => router.push("/language")}
								className='flex ms-2 md:me-24 cursor-pointer'
							>
								<img
									src='/globe.png'
									className='h-8 me-3'
									alt='Home'
								/>
								<span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
									Lingo AI
								</span>
							</div>
						</div>
						<div className='flex items-center'>
							<div className='flex items-center ms-3'>
								<div>
									<button
										type='button'
										className='flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
										aria-expanded='false'
										data-dropdown-toggle='dropdown-user'
									>
										<span className='sr-only'>Open user menu</span>
										<img
											className='w-8 h-8 rounded-full'
											src='https://randomuser.me/api/portraits'
											alt='user photo'
										/>
									</button>
								</div>
								<div
									className='z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600'
									id='dropdown-user'
								>
									<div
										className='px-4 py-3'
										role='none'
									>
										<p
											className='text-sm text-gray-900 dark:text-white'
											role='none'
										>
											Neil Sims
										</p>
										<p
											className='text-sm font-medium text-gray-900 truncate dark:text-gray-300'
											role='none'
										>
											neil.sims@flowbite.com
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>

			<aside
				id='logo-sidebar'
				className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:translate-x-0`}
				aria-label='Sidebar'
			>
				<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
					<ul className='space-y-2 font-medium'>
						{userConversationTitles.map(({ id, title }) => (
							<li key={id}>
								<div className={`flex items-center p-2 rounded-lg dark:text-white ${selectedConversation === id ? 'bg-gray-300 dark:bg-gray-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'} group`}>
									{editingTitleId === id ? (
										<div className='flex items-center w-full'>
											<input
												type='text'
												value={newTitle}
												onChange={(e) => setNewTitle(e.target.value)}
												onKeyDown={(e) => handleTitleKeyDown(e, id)}
												className='flex-1 text-gray-900 dark:text-white bg-transparent border-b border-gray-500 focus:outline-none'
												autoFocus
												style={{ maxWidth: '78%' }}
											/>
											<button
												onClick={() => saveTitle(id)}
												className='ml-2'
											>
												<img src="/checkmark.png" alt="Save" className='w-10 h-10'/>
											</button>
										</div>
									) : (
										<a
											onClick={() => fetchConversation(id)}
											onDoubleClick={() => startEditingTitle(id, title)}
											href='#'
											className='flex-1 text-gray-900 dark:text-white cursor-pointer'
										>
											<span className='ml-3'>{title}</span>
										</a>
									)}
									<button
										onClick={() => openModal(id)}
										className='ml-2'
									>
										<img src="https://www.svgrepo.com/show/21045/delete-button.svg" alt="Delete" className='w-4 h-4' />
									</button>
								</div>
							</li>
						))}
					</ul>
				</div>
			</aside>
			<div className='p-4 sm:ml-64 mt-14'>
				<div className='flex items-center justify-between mb-4'>
					<h1 className='text-3xl font-semibold text-black text-center'>
						Conversation:
					</h1>
					<button
						onClick={() => router.push("/language")}
						className='px-4 py-2 text-white bg-gray-800 rounded-lg focus:outline-none'
					>
						Go Back
					</button>
				</div>
				<div className='space-y-4'>
					{userConversations.length > 0 ? (
						userConversations.map((conversation, index) => (
							<div
								key={index}
								className={`mb-2 flex ${
									conversation.message && conversation.message.role === "user"
										? "justify-end"
										: "justify-start"
								} mx-2`}
							>
								<div
									className={`max-w-lg w-full p-4 rounded-lg shadow-2xl animate-fade ${
										conversation.message && conversation.message.role === "user"
											? "bg-green-500 text-white"
											: "bg-blue-500 text-white"
									}`}
								>
									<strong>{conversation.message && conversation.message.role === "user" ? "You:" : "AI:"}</strong>
									<div className='ml-2'>
										{conversation.message && conversation.message.content ? conversation.message.content : "No content"}
									</div>
								</div>
							</div>
						))
					) : (
						<p>No messages in this conversation.</p>
					)}
				</div>
			</div>
		</>
	);
}

export default UserChatsPage;

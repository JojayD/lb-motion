"use client";
//TODO 1: Be able to fetch the users conversations from the database using the doc id
//TODO 2: Change the conversation titles into a different unique names that are not the doc id
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useSessionTimeout from "../../hooks/useSessionTimeout";
import { useState } from "react";
import { db } from "../../../../backend/firebase/firebaseConfig";
import { collection, getDocs, doc } from "firebase/firestore";
function UserChatsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [userConversationTitles, setUserConversationTitles] = useState([]);
	const [userConversation, setUserConversation] = useState([]);
	useSessionTimeout(15 * 60 * 1000); // 15 minutes

	useEffect(() => {
		if (status === "unauthenticated") {
			router.push("/login");
		}
	}, [status, router]);

	useEffect(() => {
		const fetchConversations = async () => {
			const querySnapshot = await getDocs(
				collection(db, "users", session.user.email, "conversations")
			);
			querySnapshot.forEach((doc) => {
				// doc.data() is never undefined for query doc snapshots
				console.log(doc.id, " => ", doc.data());
				setUserConversationTitles((prev) => [...prev, doc.id]);
			});
		};

		fetchConversations();
	}, []);
	useEffect(() => {
		console.log("User conversation titles:", userConversationTitles);
	}, [userConversationTitles]);

	const fetchConversation = async (conversationId) => {};

	return (
		<>
			<nav className='fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700'>
				<div className='px-3 py-3 lg:px-5 lg:pl-3'>
					<div className='flex items-center justify-between'>
						<div className='flex items-center justify-start rtl:justify-end'>
							<button
								data-drawer-target='logo-sidebar'
								data-drawer-toggle='logo-sidebar'
								aria-controls='logo-sidebar'
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
										clip-rule='evenodd'
										fill-rule='evenodd'
										d='M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z'
									></path>
								</svg>
							</button>
							<a
								href='https://flowbite.com'
								className='flex ms-2 md:me-24'
							>
								<img
									src='/public/globe.png'
									className='h-8 me-3'
									alt=''
								/>
								<span className='self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white'>
									LingoAi
								</span>
							</a>
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
				className='fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700'
				aria-label='Sidebar'
			>
				<div className='h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800'>
					<ul className='space-y-2 font-medium'>
						{userConversationTitles.map((conversation) => (
							<li key={conversation}>
								<a
									onClick={() => {}}
									href='#'
									className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'
								>
									<svg
										className='w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='currentColor'
										viewBox='0 0 24 24'
									>
										<path d='M12 22c5.522 0 10-4.477 10-10S17.522 2 12 2 2 6.477 2 12s4.478 10 10 10zm0-18c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8zm0 6a2 2 0 10.001 3.999A2 2 0 00 12 10zm0 4c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zm0 2c2.756 0 5 2.243 5 5h-2c0-1.654-1.346-3-3-3s-3 1.346-3 3H7c0-2.757 2.244-5 5-5z' />
									</svg>
									<span className='ml-3'>{conversation}</span>
								</a>
							</li>
						))}
					</ul>
				</div>
			</aside>
			<div class='p-4 sm:ml-64'>
				<div class='flex items-center justify-between mb-4'>
					<h1 class='text-3xl font-semibold text-black text-center'>
						Conversation:
					</h1>
					<button
						onClick={() => router.push("/")}
						class='px-4 py-2 text-white bg-gray-800 rounded-lg focus:outline-none'
					>
						Go Back
					</button>
				</div>
				<div class='space-y-4'>
					{userConversation.map((conversation, index) => (
						<div
							key={conversation.id}
							class={`mb-2 flex ${
								conversation.isUser ? "justify-end" : "justify-start"
							} mx-2`}
						>
							<div
								class={`max-w-lg w-full p-4 rounded-lg shadow-2xl animate-fade ${
									conversation.isUser
										? "bg-green-500 text-white"
										: "bg-blue-500 text-white"
								}`}
							>
								<strong>{conversation.isUser ? "You:" : "AI:"}</strong>
								<div class='ml-2'>
									{conversation.message ? conversation.message.content : "No content"}
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default UserChatsPage;

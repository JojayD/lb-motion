"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { storage } from '../../../backend/firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { sendPasswordResetEmail } from 'firebase/auth';

const UserSetting = () => {
  const { data: session } = useSession();
  const [avatar, setAvatar] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [profilePictureURL, setProfilePictureURL] = useState('/earth.png'); // default profile picture
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) {
      const firestore = getFirestore();
      const fetchProfilePicture = async () => {
        const docRef = doc(firestore, 'users', session.user.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.profilePictureURL) {
            setProfilePictureURL(data.profilePictureURL);
          }
        }
      };

      fetchProfilePicture();
    }
  }, [session]);

  const handleAvatarChange = (e) => {
    if (e.target.files[0]) {
      setAvatar(e.target.files[0]);
    }
  };

  const handleAvatarUpload = () => {
    if (avatar && session) {
      const storageRef = ref(storage, `avatars/${session.user.id}`);
      const uploadTask = uploadBytesResumable(storageRef, avatar);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error("Upload error: ", error);
          setError("Failed to upload avatar. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setProfilePictureURL(downloadURL);

            // Save the download URL to Firestore
            await setDoc(doc(getFirestore(), 'users', session.user.id), { profilePictureURL: downloadURL }, { merge: true });
            setError(''); // Clear any previous error message
          } catch (error) {
            console.error("Error updating Firestore: ", error);
            setError("Failed to update profile picture. Please try again.");
          }
        }
      );
    } else {
      setError('No file selected or user not signed in');
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (session && resetEmail === session.user.email) {
      try {
        await sendPasswordResetEmail(auth, resetEmail);
        alert('Password reset email sent');
        setError(''); // Clear any previous error message
      } catch (error) {
        console.error("Password reset error: ", error);
        setError('Failed to send password reset email. Please try again.');
      }
    } else {
      setError('Please enter the correct email address');
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-semibold mb-4'>User Settings</h1>

      {/* Profile Picture Section */}
      <div className='flex items-center mb-4'>
        <div className='w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300'>
          <img
            src={profilePictureURL}
            alt='Profile'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='ml-4'>
          <label className='block text-sm font-medium text-gray-700 mb-1'>
            Upload Profile Picture
          </label>
          <label
            htmlFor='profilePictureInput'
            className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer text-sm'
          >
            Choose File
          </label>
          <input
            type='file'
            id='profilePictureInput'
            className='hidden'
            onChange={handleAvatarChange}
          />
          <button
            type='button'
            className='bg-green-500 text-white px-4 py-2 rounded-md mt-2 text-sm'
            onClick={handleAvatarUpload}
          >
            Upload
          </button>
          {uploadProgress > 0 && <div className='mt-2 text-sm'>Upload progress: {uploadProgress}%</div>}
          {error && <div className='mt-2 text-red-500'>{error}</div>}
        </div>
      </div>

      {/* Password Reset Section */}
      <form onSubmit={handlePasswordReset}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Reset Password
          </label>
          <input
            type='email'
            className='mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm p-2 text-sm'
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            placeholder='Enter your email'
            required
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded-md text-sm'
        >
          Send Password Reset Email
        </button>
        {error && <div className='mt-2 text-red-500'>{error}</div>}
      </form>
    </div>
  );
};

export default UserSetting;

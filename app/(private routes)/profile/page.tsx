// app/profile/page.tsx
import css from "@/components/EditProfilePage/EditProfilePage.module.css"
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";;
import { getMeServer } from "@/lib/api/serverApi";


export const metadata: Metadata = {
  title: 'User Profile',
  description: 'Profile page with user information and avatar',
  openGraph: {
    title: 'User Profile',
    description: 'Profile page with user information and avatar',
    url: 'https://your-app.vercel.app/profile',
    siteName: 'Your App',
    images: [
      {
        url: 'https://ac.goit.global/path-to-avatar.jpg',
        width: 1200,
        height: 630,
        alt: 'User Avatar',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'User Profile',
    description: 'Profile page with user information and avatar',
    images: ['https://ac.goit.global/path-to-avatar.jpg'],
  },
};

export default async function Profile() {
  const user = await getMeServer();

  return (
    <section>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src={user.avatar || "/default-avatar.png"}
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </section>
  );
}

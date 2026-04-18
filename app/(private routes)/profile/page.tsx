// app/profile/page.tsx
import css from "@/components/EditProfilePage/EditProfilePage.module.css"
import Image from 'next/image';


export const metadata = {
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

export default function Profile() {
  return (
    <section>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <a href="" className={css.editProfileButton}>
              Edit Profile
            </a>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="/Avatar"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Username: {}</p>
            <p>Email: your_email@example.com</p>
          </div>
        </div>
      </main>
    </section>
  );
}

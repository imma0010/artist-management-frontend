"use client"
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const MusicPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the 'id' parameter from the URL

  return (
    <div>
      <h1>Music Page</h1>
    </div>
  );
};

export default MusicPage;

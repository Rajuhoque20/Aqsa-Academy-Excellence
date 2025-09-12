
import { getServerSession } from 'next-auth';
import { AboutUs } from 'src/components/AboutUs/AboutUs';
import { Contact } from 'src/components/Contact/Contact';
import { Gallery } from 'src/components/Gallery/Gallery';
import { BannerHome } from 'src/components/Home/Home';
import { NewsFeed } from 'src/components/NewsFeed/NewsFeed';
import { OurTopper } from 'src/components/OurTopper/OurTopper';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session=await getServerSession(authOptions);
  if(session){
    redirect('/student');
  }
  return (
    <>
    <BannerHome/>
    <NewsFeed/>
    <OurTopper/>
    <Gallery/>
    <AboutUs/>
    <Contact/>
    </>
  );
}


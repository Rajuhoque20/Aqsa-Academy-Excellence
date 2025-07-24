
import { AboutUs } from 'src/components/AboutUs/AboutUs';
import { Contact } from 'src/components/Contact/Contact';
import { Gallery } from 'src/components/Gallery/Gallery';
import { BannerHome } from 'src/components/Home/Home';
import { NewsFeed } from 'src/components/NewsFeed/NewsFeed';
import { OurTopper } from 'src/components/OurTopper/OurTopper';
import { Overview } from 'src/components/Overview/Overview';


export default function Home() {
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


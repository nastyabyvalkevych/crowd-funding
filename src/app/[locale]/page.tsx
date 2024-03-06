import HeroSection from "@/components/sections/HeroSection";
import { currentUser } from "@clerk/nextjs";

export default function Home() {
    const loggedInUserData = currentUser();
    console.log(loggedInUserData);
  return <HeroSection />;
}

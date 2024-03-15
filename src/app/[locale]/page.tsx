import { handleNewUserRegistration } from "@/api/users";
import HeroSection from "@/components/sections/HeroSection";

export default async function Home() {
  await handleNewUserRegistration();
  return <HeroSection />;
}

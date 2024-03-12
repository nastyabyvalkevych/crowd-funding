import DonateSection from "@/components/sections/DonateSection";
// import { currentUser } from "@clerk/nextjs";

export default async function About() {
  // const loggedInUserData = await currentUser();

  return (
    <div>
      <div className="px-4 md:px-16 flex flex-col gap-8 md:gap-20 ">
        <DonateSection />
        {/* <h1>Clerk ID:{loggedInUserData?.id}</h1>
        <h1>Username:{loggedInUserData?.firstName}</h1>
        <h1>Clerk ID:{loggedInUserData?.emailAddresses[0].emailAddress}</h1> */}
      </div>
    </div>
  );
}

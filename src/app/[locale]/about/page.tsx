import { Locale } from "@/i18n";

export default async function About({
  params: { lang },
}: {
  params: { lang: Locale };
}) {


  return (
    <h1>About</h1>
  );
}

import HomePageContent from "@/app/components/HomePageContent";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home({ params }: { params: { locale: string } }) {
  const user = await currentUser();

  if (user?.publicMetadata?.role === 'admin') {
    redirect(`/${params.locale}/admin`);
  }

  return <HomePageContent />;
}

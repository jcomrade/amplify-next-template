import NavTabs from "@/components/Header/NavTabs";
import ProfileTab from "@/components/Header/ProfileTab";
import { fetchAuthSession } from 'aws-amplify/auth';
import { redirect } from "next/navigation";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // try {
  //   const auth = await fetchAuthSession();
  //   console.log(auth)
  //   if(!auth.tokens){
  //     redirect('/login');
  //   }
  // } catch (error) {
  //   console.log(error)
  //   redirect('/login');
  // }
  return (
      <div style={{ margin: 0 }}>
        <ProfileTab />
        <NavTabs />
        {children}
      </div>
  );
}

import type { Metadata } from "next";
import ConfigureAmplifyClientSide from "@/components/ConfigureAmplify";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{margin: 0, backgroundColor: "#0F1214"}}>
        <ConfigureAmplifyClientSide />
        {children}
      </body>
    </html>
  );
}

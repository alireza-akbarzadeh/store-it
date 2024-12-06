import { Header } from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { MobileNavigation } from "@/components/mobile-navigation";
import { PropsWithChildren } from "react";
import { getCurrentUser } from "@/lib/actions/user.action";
import { redirect } from "next/navigation";

export default async function Layout({ children }: PropsWithChildren) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/sign-in");
  }
  console.log({ currentUser });
  console.log(currentUser);
  return (
    <main className="flex h-screen">
      <Sidebar {...currentUser} />
      <section className="flex h-full flex-1 flex-col">
        <MobileNavigation {...currentUser} />
        <Header />
        <div className="main-content">{children}</div>
      </section>
    </main>
  );
}

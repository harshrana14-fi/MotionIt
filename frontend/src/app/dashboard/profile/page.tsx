import { getFullUser } from "@/app/auth.actions";
import { redirect } from "next/navigation";
import ProfileClient from "./ProfileClient";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const user = await getFullUser();
  if (!user) {
    redirect("/signin");
  }

  return <ProfileClient user={user} />;
}

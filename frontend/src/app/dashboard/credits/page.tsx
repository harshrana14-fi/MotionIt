import { getFullUser } from "@/app/auth.actions";
import { redirect } from "next/navigation";
import CreditsClient from "./CreditsClient";

export const dynamic = "force-dynamic";

export default async function CreditsPage() {
  const user = await getFullUser();
  if (!user) {
    redirect("/signin");
  }

  return <CreditsClient user={user} />;
}

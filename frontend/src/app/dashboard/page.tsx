import { getSession } from "@/app/auth.actions";
import { getUserGenerations } from "@/app/generate.actions";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/signin");

  const generationsRes = await getUserGenerations();
  const generations = generationsRes.success ? generationsRes.generations : [];

  return <DashboardClient session={session as any} initialGenerations={generations} />;
}

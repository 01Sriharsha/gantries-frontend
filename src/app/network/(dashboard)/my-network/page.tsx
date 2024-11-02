import { isAuthenticated } from "@/utils/authenticate";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

enum Tab {
  FRIENDS = "FRIENDS",
  COMMUNITES = "COMMUNITES",
}

export default async function MyNetwork() {
  const auth = await isAuthenticated();

  if (!auth) redirect("/login");

  return (
    <Tabs defaultValue={Tab.FRIENDS} className="h-[90vh] overflow-auto">
      <TabsList className="w-full justify-center rounded-none">
        <TabsTrigger value={Tab.FRIENDS}>Friends</TabsTrigger>
        <TabsTrigger value={Tab.COMMUNITES}>Communites</TabsTrigger>
      </TabsList>
      <TabsContent value={Tab.FRIENDS} className="px-4 py-2">
        Friends tab
      </TabsContent>
      <TabsContent value={Tab.COMMUNITES} className="px-4 py-2">
        Communities tab
      </TabsContent>
    </Tabs>
  );
}

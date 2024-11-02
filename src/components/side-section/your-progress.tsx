import Progress from "@/components/globals/progress";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { isAuthenticated } from "@/utils/authenticate";

export default async function YourProgress() {
  const authenticated = await isAuthenticated();
  console.log("authenticated", authenticated);

  return (
    <Card className="flex flex-col gap-4 border border-secondary p-2.5 rounded-none">
      <CardTitle className="text-xl text-primary font-semibold">
        Your progress
      </CardTitle>
      <CardContent className="flex items-center gap-4 justify-center p-0">
        <Progress
          type="Circle"
          percent={30}
          title="Completed projects"
          className="w-20 h-20"
        />
        <Progress
          type="Circle"
          percent={65}
          title="Connections made"
          className="w-20 h-20"
        >
          <p className="text-xl font-bold text-primary">65/100</p>
        </Progress>
      </CardContent>
    </Card>
  );
}

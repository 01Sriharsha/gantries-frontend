import { Input } from "../ui/input";

export default function ChatInput() {
  return (
    <div className="relative flex items-center w-full">
      <Input
        type="text"
        placeholder="Type here"
        className="pl-8 focus-visible:ring-1 focus-visible:ring-primary border border-secondary rounded-full"
      />
    </div>
  );
}

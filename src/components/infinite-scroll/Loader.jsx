import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-2">
      <Loader2 className="size-4 text-black/20 animate-spin transition-all" />
    </div>
  );
};

export default Loader;

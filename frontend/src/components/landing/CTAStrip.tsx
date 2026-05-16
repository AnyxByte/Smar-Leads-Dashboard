import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export default function CTAStrip() {
  return (
    <div className="mb-10 bg-violet-50 border border-violet-200 rounded-xl p-8 text-center">
      <h2 className="text-xl font-medium text-violet-900 mb-2">
        Ready to close more deals?
      </h2>
      <p className="text-sm text-violet-600 mb-5">
        Join sales teams already using LeadFlow to manage their pipeline.
      </p>
      <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2 mx-auto">
        Get started free <ChevronRight size={15} />
      </Button>
    </div>
  );
}

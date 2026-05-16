import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";


interface DeleteModalProps {
  open: boolean;
  leadName: string;
  onClose: () => void;
  onConfirm: () => void;
}


export default function DeleteModal({ open, leadName, onClose, onConfirm }: DeleteModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-2xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-150">
        <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Trash2 size={18} className="text-red-600" />
        </div>
        <h2 className="text-base font-semibold text-zinc-900 mb-1">
          Delete lead?
        </h2>
        <p className="text-sm text-zinc-500 mb-6">
          <span className="font-medium text-zinc-700">{leadName}</span> will be
          permanently removed. This action cannot be undone.
        </p>
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
            onClick={onConfirm}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
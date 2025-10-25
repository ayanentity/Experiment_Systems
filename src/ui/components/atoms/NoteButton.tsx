import { Button } from "@/components/ui/button";
import { MusicalNote, NOTE_CONFIG } from "../../../domain/models/MusicalNote";

/**
 * 音階ボタンのProps
 */
interface NoteButtonProps {
  note: MusicalNote;
  onClick: (note: MusicalNote) => void;
  disabled?: boolean;
}

/**
 * 音階ボタンコンポーネント（Atom）
 */
export function NoteButton({ note, onClick, disabled = false }: NoteButtonProps) {
  return (
    <Button
      onClick={() => onClick(note)}
      variant="default"
      size="lg"
      className="min-w-[80px] h-16 text-lg font-semibold active:scale-95 transition-transform"
      disabled={disabled}
    >
      {NOTE_CONFIG[note].label}
    </Button>
  );
}

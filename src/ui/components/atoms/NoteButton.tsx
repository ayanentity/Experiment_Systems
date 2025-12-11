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
 * クリックイベントのみで動作し、ホバーでは反応しない
 */
export function NoteButton({
  note,
  onClick,
  disabled = false,
}: NoteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // 実際のユーザー操作によるクリックのみを処理
    if (!e.isTrusted) return;

    // クリックイベントのみを処理（type が 'click' であることを確認）
    if (e.type !== "click") return;

    onClick(note);
  };

  return (
    <Button
      onClick={handleClick}
      variant="default"
      size="lg"
      className="min-w-[80px] h-16 text-lg font-semibold active:scale-95 transition-transform"
      disabled={disabled}
    >
      {NOTE_CONFIG[note].label}
    </Button>
  );
}

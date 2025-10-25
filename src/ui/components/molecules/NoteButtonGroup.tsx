import { MusicalNote, ALL_NOTES } from "../../../domain/models/MusicalNote";
import { NoteButton } from "../atoms/NoteButton";

/**
 * 音階ボタングループのProps
 */
interface NoteButtonGroupProps {
  onNoteClick: (note: MusicalNote) => void;
  disabled?: boolean;
}

/**
 * 音階ボタングループコンポーネント（Molecule）
 */
export function NoteButtonGroup({ onNoteClick, disabled = false }: NoteButtonGroupProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      {ALL_NOTES.map((note) => (
        <NoteButton
          key={note}
          note={note}
          onClick={onNoteClick}
          disabled={disabled}
        />
      ))}
    </div>
  );
}

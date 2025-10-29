import { useState, FormEvent } from 'react';
import { useNotes, NotePriority } from '../contexts/NotesContext';
import { StickyNote, Trash2 } from 'lucide-react';

export default function NoteManagerCard() {
  const [noteText, setNoteText] = useState('');
  const [priority, setPriority] = useState<NotePriority>('normal');
  const { notes, addNote, deleteNote, changePriority } = useNotes();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (noteText.trim()) {
      addNote(noteText.trim(), priority);
      setNoteText('');
      setPriority('normal');
    }
  };

  const notesByPriority = {
    important: notes.filter(n => n.priority === 'important'),
    normal: notes.filter(n => n.priority === 'normal'),
    delayed: notes.filter(n => n.priority === 'delayed'),
  };

  const priorityColors = {
    important: 'border-red-200 bg-red-50',
    normal: 'border-blue-200 bg-blue-50',
    delayed: 'border-amber-200 bg-amber-50',
  };

  const priorityLabels = {
    important: 'Important',
    normal: 'Normal',
    delayed: 'Delayed',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-slate-900 p-3 rounded-lg">
          <StickyNote className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Note Manager</h2>
      </div>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="space-y-3">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Enter your note..."
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
          />
          <div className="flex gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as NotePriority)}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent outline-none"
            >
              <option value="important">Important</option>
              <option value="normal">Normal</option>
              <option value="delayed">Delayed</option>
            </select>
            <button
              type="submit"
              className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors font-medium"
            >
              Add Note
            </button>
          </div>
        </div>
      </form>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {(['important', 'normal', 'delayed'] as NotePriority[]).map((priorityKey) => (
          <div key={priorityKey}>
            <h3 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
              <span
                className={`w-3 h-3 rounded-full ${
                  priorityKey === 'important'
                    ? 'bg-red-500'
                    : priorityKey === 'normal'
                    ? 'bg-blue-500'
                    : 'bg-amber-500'
                }`}
              ></span>
              {priorityLabels[priorityKey]} ({notesByPriority[priorityKey].length})
            </h3>
            <div className="space-y-2">
              {notesByPriority[priorityKey].length === 0 ? (
                <p className="text-sm text-slate-400 italic pl-5">No notes</p>
              ) : (
                notesByPriority[priorityKey].map((note) => (
                  <div
                    key={note.id}
                    className={`p-3 rounded-lg border ${priorityColors[priorityKey]}`}
                  >
                    <div className="flex justify-between items-start gap-2">
                      <p className="text-sm text-slate-900 flex-1">{note.text}</p>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-red-600 hover:text-red-800 transition-colors flex-shrink-0"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="flex gap-1 mt-2">
                      {(['important', 'normal', 'delayed'] as NotePriority[])
                        .filter(p => p !== note.priority)
                        .map((p) => (
                          <button
                            key={p}
                            onClick={() => changePriority(note.id, p)}
                            className="text-xs px-2 py-1 bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors"
                          >
                            Move to {priorityLabels[p]}
                          </button>
                        ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

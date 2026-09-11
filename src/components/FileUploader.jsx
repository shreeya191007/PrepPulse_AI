import { useState } from 'react';
import { Upload, FileText, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { usePdfParser } from '../hooks/usePdfParser';

export function FileUploader({ onFileParsed, notesList }) {
  const { parseFile, isParsing, progress, error } = usePdfParser();
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const processFile = async (file) => {
    try {
      const parsedData = await parseFile(file);
      onFileParsed(parsedData);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-3xl mx-auto space-y-8">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative flex flex-col items-center justify-center p-8 sm:p-12 border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer shadow-sm ${
          dragActive
            ? 'border-[#527358] bg-[#EBF0EC] scale-[1.01]'
            : 'border-[#D5C9BD] bg-[#F4EDE8] hover:border-[#9E7B66] hover:bg-[#EFE7E0]'
        }`}
      >
        <input
          type="file"
          accept=".pdf,.txt"
          onChange={handleChange}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          aria-label="upload lecture notes or resume"
        />

        <div className="p-4 rounded-2xl bg-[#9E7B66]/15 text-[#9E7B66] mb-4 border border-[#9E7B66]/25">
          <Upload className="w-8 h-8" />
        </div>
        <p className="text-base sm:text-lg font-bold text-[#262322] text-center">
          Drag and drop lecture notes or resume
        </p>
        <p className="text-xs text-[#736C68] text-center mt-1">
          Supports PDF and TXT files up to 25MB
        </p>

        {isParsing && (
          <div className="w-full max-w-xs mt-6 space-y-2">
            <div className="flex justify-between text-xs text-[#615B57] font-medium">
              <span className="flex items-center gap-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#527358]" /> Parsing Content...
              </span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-[#E2DCD4] rounded-full overflow-hidden border border-[#D0C7BC]">
              <div
                className="h-full bg-[#527358] transition-all duration-300 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 mt-4 text-[#A84343] text-xs font-semibold bg-[#FADBD8] border border-[#F1948A] px-4 py-2 rounded-xl">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-[#736C68] uppercase tracking-widest">
          Active Knowledge Base ({notesList.length})
        </h3>
        <div className="grid gap-3">
          {notesList.map((note) => (
            <div
              key={note.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-[#F3EFEA] border border-[#DDD5CD] shadow-xs hover:border-[#9E7B66] transition-all gap-3 sm:gap-0"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#9E7B66]/10 text-[#9E7B66] border border-[#9E7B66]/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#262322]">{note.name}</p>
                  <p className="text-xs text-[#736C68]">{note.size} • Uploaded {note.uploadedAt}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#527358] bg-[#EBF0EC] border border-[#A3B899]/50 px-3 py-1 rounded-full self-end sm:self-auto">
                <CheckCircle2 className="w-3.5 h-3.5" /> Ready
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
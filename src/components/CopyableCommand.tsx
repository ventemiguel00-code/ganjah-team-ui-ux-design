import { useState } from 'react';
import { Button } from './ui/button';
import { Copy, CheckCircle2 } from 'lucide-react';

interface CopyableCommandProps {
  command: string;
  label?: string;
}

export function CopyableCommand({ command, label = 'Comando SQL' }: CopyableCommandProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // Método con textarea (más compatible)
    const textArea = document.createElement('textarea');
    textArea.value = command;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Error copiando con execCommand:', error);
    } finally {
      document.body.removeChild(textArea);
    }
  };

  const handleSelectAll = () => {
    const textarea = document.getElementById('copyable-textarea') as HTMLTextAreaElement;
    if (textarea) {
      textarea.select();
      textarea.focus();
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm text-zinc-400 block">{label}</label>
      )}
      
      <div className="relative">
        <textarea
          id="copyable-textarea"
          readOnly
          value={command}
          onClick={handleSelectAll}
          className="w-full bg-black border border-zinc-600 rounded-lg p-3 text-[#39FF14] text-sm font-mono resize-none focus:outline-none focus:border-[#39FF14] cursor-pointer"
          rows={2}
        />
        
        <div className="flex gap-2 mt-2">
          <Button
            onClick={handleCopy}
            size="sm"
            className={
              copied 
                ? 'bg-green-600 hover:bg-green-700 flex-1' 
                : 'bg-[#39FF14] hover:bg-[#32E010] text-black flex-1'
            }
          >
            {copied ? (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                ¡Copiado!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                Copiar al Portapapeles
              </>
            )}
          </Button>
          
          <Button
            onClick={handleSelectAll}
            size="sm"
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
          >
            Seleccionar Todo
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-zinc-500">
        💡 Haz clic en el texto para seleccionar, o usa los botones
      </p>
    </div>
  );
}

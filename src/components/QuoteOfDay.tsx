'use client';

import { Share2, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface QuoteOfDayProps {
    quote: string;
    author: string;
    authorInfo?: string;
    className?: string;
}

export function QuoteOfDay({
    quote,
    author,
    authorInfo,
    className = ''
}: QuoteOfDayProps) {
    const [copied, setCopied] = useState(false);

    const shareText = `"${quote}" - ${author}`;
    const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    };

    return (
        <section className={`w-full ${className}`}>
            <div className="border-[7px] border-[#D4DFEC] py-12 px-6 md:px-12">
                {/* Título */}
                <h2 className="text-center text-sm font-medium tracking-wider text-[#151515] uppercase mb-6">
                    Frase do Dia
                </h2>

                {/* Citação */}
                <blockquote className="text-center mb-6">
                    <p className="font-serif text-xl md:text-2xl font-bold text-black leading-relaxed">
                        "{quote}"
                    </p>
                </blockquote>

                {/* Autor */}
                <div className="text-center mb-8">
                    <p className="font-serif text-base text-black mb-1">
                        {author}
                    </p>
                    {authorInfo && (
                        <p className="text-xs font-medium text-[#AAAAAA] uppercase tracking-wide">
                            {authorInfo}
                        </p>
                    )}
                </div>

                {/* Ícones de compartilhamento */}
                <div className="flex items-center justify-center gap-4">
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-black text-white hover:opacity-80 transition-opacity"
                        aria-label="Compartilhar no Twitter"
                    >
                        <Twitter size={16} />
                    </a>
                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#1877F2] text-white hover:opacity-80 transition-opacity"
                        aria-label="Compartilhar no Facebook"
                    >
                        <Facebook size={16} />
                    </a>
                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#0A66C2] text-white hover:opacity-80 transition-opacity"
                        aria-label="Compartilhar no LinkedIn"
                    >
                        <Linkedin size={16} />
                    </a>
                    <a
                        href={shareLinks.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-[#25D366] text-white hover:opacity-80 transition-opacity"
                        aria-label="Compartilhar no WhatsApp"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                    </a>
                    <button
                        onClick={handleCopy}
                        className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-500 text-white hover:opacity-80 transition-opacity"
                        aria-label="Copiar frase"
                    >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                </div>
            </div>
        </section>
    );
}

export default QuoteOfDay;

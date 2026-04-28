import React from 'react';
import { ExternalLink, FileText, Download } from 'lucide-react';
import { cn } from '../lib/utils';

interface ResourceLinkProps {
  url: string;
  label?: string;
  className?: string;
}

const ResourceLink: React.FC<ResourceLinkProps> = ({ url, label = 'View Resource', className }) => {
  // Simple check if link looks like an external resource or a specific platform
  const isOneDrive = url.includes('1drv.ms') || url.includes('onedrive.live.com');
  const isImage = /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(url);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-bold uppercase tracking-widest text-[10px]",
        "bg-white border border-gray-100 soft-shadow hover:bg-primary hover:text-white group",
        className
      )}
    >
      {isImage ? <ExternalLink size={14} /> : <FileText size={14} />}
      <span>{isOneDrive ? 'View OneDrive File' : label}</span>
      <Download size={14} className="opacity-0 group-hover:opacity-100 transition-opacity ml-auto" />
    </a>
  );
};

export default ResourceLink;

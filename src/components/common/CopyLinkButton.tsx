'use client';

import { useState } from 'react';

import { Button } from '../ui/button';
import { Toaster } from '@/components/ui/sonner';

import useWatchTimeout from '@/hook/useWatchTimeout';
import { Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface ButtonProps {
  size?: number;
  className?: string;
  url?: string;
  variant?: 'outline' | 'default';
}

const CopyLinkButton = ({
  size = 16,
  className,
  url,
  variant = 'outline',
}: ButtonProps) => {
  const [copied, setCopied] = useState(false);

  useWatchTimeout(copied, 3000, () => {
    setCopied(false);
  });

  const successToast = () => toast.success('Successfully Copied');

  const failToast = () => toast.error('Copy Failed');

  const handleCopy = async () => {
    const copyUrl = url ? url : window.document.location.href;
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopied(true);
      successToast();
    } catch (e) {
      console.error(e);
      failToast();
    }
  };

  return (
    <Button
      variant={variant}
      size='icon'
      onClick={handleCopy}
      className={className}
    >
      <Toaster />
      <span className='sr-only'>Copy</span>
      {copied ? <Check size={size} /> : <Copy size={size} />}
    </Button>
  );
};

export default CopyLinkButton;

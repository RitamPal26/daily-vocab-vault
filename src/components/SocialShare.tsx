
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Copy, Check } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { getStreakData } from '@/lib/streakUtils';

interface SocialShareProps {
  word: string;
  definition: string;
  compact?: boolean;
}

const SocialShare = ({ word, definition, compact = false }: SocialShareProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const streakData = getStreakData();

  const generateShareText = () => {
    return `I learned the word "${word}" today: ${definition}. ${streakData.currentStreak > 1 ? `I'm on a ${streakData.currentStreak}-day streak! ` : ''}#WordDaily`;
  };

  const handleShare = () => {
    const shareText = generateShareText();
    
    if (navigator.share) {
      navigator.share({
        title: 'Word Daily - Word of the Day',
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        // Fallback if share fails
        copyToClipboard(shareText);
      });
    } else {
      // Fallback for browsers that don't support sharing
      copyToClipboard(shareText);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: "Copied to clipboard",
        description: "Now you can paste and share it anywhere!",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    });
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  if (compact) {
    return (
      <Button
        onClick={handleShare}
        variant="outline"
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        <span>Share</span>
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="text-lg font-medium">Share this word</h3>
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          onClick={handleTwitterShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Twitter className="h-4 w-4" />
          <span>Twitter</span>
        </Button>
        <Button
          onClick={handleFacebookShare}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Facebook className="h-4 w-4" />
          <span>Facebook</span>
        </Button>
        <Button
          onClick={() => copyToClipboard(generateShareText())}
          variant="outline"
          className="flex items-center gap-2"
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </Button>
        {navigator.share && (
          <Button
            onClick={handleShare}
            variant="default"
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialShare;

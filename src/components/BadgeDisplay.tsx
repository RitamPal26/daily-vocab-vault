
import { Award, Heart, BookOpen, Calendar, Stars, Trophy, Medal } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { badgeInfo } from '@/lib/streakUtils';

interface BadgeDisplayProps {
  badges: string[];
  compact?: boolean;
}

const BadgeDisplay = ({ badges, compact = false }: BadgeDisplayProps) => {
  // Map badge IDs to icons
  const getBadgeIcon = (badgeId: string) => {
    switch (badgeId) {
      case 'week-streak':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case 'month-streak':
        return <Trophy className="h-5 w-5 text-purple-500" />;
      case 'century-streak':
        return <Stars className="h-5 w-5 text-yellow-500" />;
      case 'dedicated-learner':
        return <BookOpen className="h-5 w-5 text-green-500" />;
      case 'vocabulary-enthusiast':
        return <Medal className="h-5 w-5 text-orange-500" />;
      default:
        return <Award className="h-5 w-5 text-gray-500" />;
    }
  };

  if (badges.length === 0) {
    return null;
  }

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {badges.map((badgeId) => (
          <Tooltip key={badgeId}>
            <TooltipTrigger asChild>
              <div className="p-2 bg-secondary rounded-full hover:bg-secondary/80 cursor-help transition-colors">
                {getBadgeIcon(badgeId)}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-medium">{badgeInfo[badgeId]?.name || badgeId}</p>
              <p className="text-xs text-muted-foreground">{badgeInfo[badgeId]?.description}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    );
  }

  return (
    <Card className="p-4">
      <h3 className="text-lg font-medium mb-3">Your Achievements</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((badgeId) => (
          <div key={badgeId} className="flex items-center p-2 rounded-lg border bg-background">
            <div className="mr-3 p-2 bg-secondary rounded-full">
              {getBadgeIcon(badgeId)}
            </div>
            <div>
              <p className="font-medium text-sm">{badgeInfo[badgeId]?.name || badgeId}</p>
              <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                {badgeInfo[badgeId]?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default BadgeDisplay;

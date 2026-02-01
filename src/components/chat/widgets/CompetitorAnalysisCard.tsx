import React from 'react';
import { Button } from '@/components/ui/button';
import { Swords, Trophy, Target, ArrowRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CompetitorAnalysisProps {
    data: {
        rank: number;
        topCompetitor: {
            name: string;
            priceDiff: string;
            strength: string;
        };
        marketShare: number;
        opportunities: string[];
    }
}

export const CompetitorAnalysisCard = ({ data }: CompetitorAnalysisProps) => {
    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-lg">
            <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <Swords className="h-4 w-4" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-gray-900 dark:text-white">Competitor Intel</h4>
                        <p className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Market Analysis</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-gray-400 font-bold uppercase">Your Rank</span>
                    <span className="text-xl font-black text-gray-900 dark:text-white flex items-center">
                        #{data.rank} <Trophy className="h-4 w-4 text-yellow-500 ml-1" />
                    </span>
                </div>
            </div>

            <div className="p-5 space-y-5">
                <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-xl border border-red-100 dark:border-red-900/20">
                    <p className="text-[10px] font-black uppercase text-red-500 tracking-widest mb-2">Vs Top Competitor</p>
                    <div className="flex justify-between items-start mb-2">
                        <span className="font-bold text-gray-800 dark:text-gray-100 text-sm">{data.topCompetitor.name}</span>
                        <span className="text-xs font-bold text-red-600 bg-white px-2 py-0.5 rounded-md shadow-sm">{data.topCompetitor.priceDiff}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Stronger at: <span className="font-semibold text-gray-900 dark:text-gray-200">{data.topCompetitor.strength}</span>
                    </p>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
                        <span>Market Share</span>
                        <span>{data.marketShare}%</span>
                    </div>
                    <Progress value={data.marketShare} className="h-2" />
                    <p className="text-[10px] text-right text-gray-400 italic">Top competitor holds 35%</p>
                </div>

                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest flex items-center gap-1.5">
                        <Target className="h-3 w-3" /> Key Opportunities
                    </p>
                    <ul className="space-y-2">
                        {data.opportunities.map((opp, i) => (
                            <li key={i} className="text-xs flex gap-2 items-start p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-default">
                                <span className="text-primary-600 font-bold">{i + 1}.</span>
                                <span className="text-gray-600 dark:text-gray-300 font-medium">{opp}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <Button variant="outline" className="w-full rounded-xl text-xs h-10 font-bold group">
                    View Full Report <ArrowRight className="h-3 w-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </div>
    );
};

import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp, AlertCircle, ArrowUp, ArrowRight, Check } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface PricingAnalysisProps {
    data: {
        venueName: string;
        timeSlot: string;
        currentPrice: number;
        suggestedPrice: number;
        reason: string[];
        predictions: {
            bookings: string;
            revenue: string;
            margin: string;
        };
        confidence: number;
    }
}

export const PricingAnalysisCard = ({ data }: PricingAnalysisProps) => {
    const percentChange = Math.round(((data.suggestedPrice - data.currentPrice) / data.currentPrice) * 100);
    const isIncrease = percentChange > 0;

    return (
        <div className="w-full max-w-sm bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl ring-1 ring-black/5">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp className="h-24 w-24" />
                </div>
                <div className="relative z-10">
                    <h3 className="font-black text-sm uppercase tracking-widest opacity-80 mb-1">Smart Pricing Suggestion</h3>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold">{data.suggestedPrice.toLocaleString()}đ</span>
                        <span className={`text-sm font-bold bg-white/20 px-2 py-0.5 rounded-lg flex items-center gap-1`}>
                            {isIncrease ? <ArrowUp className="h-3 w-3" /> : <ArrowRight className="h-3 w-3" />}
                            {Math.abs(percentChange)}%
                        </span>
                    </div>
                    <p className="text-xs mt-1 text-white/80">Current: {data.currentPrice.toLocaleString()}đ • {data.timeSlot}</p>
                </div>
            </div>

            <div className="p-5 space-y-4">
                <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Analysis Reasons</p>
                    <ul className="space-y-1">
                        {data.reason.map((r, i) => (
                            <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-start gap-2">
                                <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-indigo-500 shrink-0" />
                                {r}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="grid grid-cols-3 gap-2 bg-gray-50 dark:bg-gray-800/50 p-2 rounded-xl">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-bold mb-0.5">Bookings</p>
                        <p className="text-xs font-bold text-gray-900 dark:text-white">{data.predictions.bookings}</p>
                    </div>
                    <div className="text-center border-x border-gray-200 dark:border-gray-700">
                        <p className="text-[10px] text-gray-400 font-bold mb-0.5">Revenue</p>
                        <p className="text-xs font-bold text-green-600">{data.predictions.revenue}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-400 font-bold mb-0.5">Margin</p>
                        <p className="text-xs font-bold text-indigo-600">{data.predictions.margin}</p>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex justify-between text-[10px] font-bold uppercase text-gray-400">
                        <span>AI Confidence</span>
                        <span>{data.confidence}%</span>
                    </div>
                    <Progress value={data.confidence} className="h-1.5" />
                </div>

                <div className="flex gap-2 pt-2">
                    <Button variant="outline" className="flex-1 rounded-xl text-xs h-10 font-bold">Adjust</Button>
                    <Button className="flex-1 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs h-10 font-bold shadow-lg shadow-indigo-500/20">
                        <Check className="h-3 w-3 mr-1" /> Apply Price
                    </Button>
                </div>
            </div>
        </div>
    );
};

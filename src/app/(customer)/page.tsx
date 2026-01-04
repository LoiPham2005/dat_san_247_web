import { HeroSection } from '@/components/customer/home/HeroSection';
import { SportsCategories } from '@/components/customer/home/SportsCategories';
import { PromoBanner } from '@/components/customer/home/PromoBanner';
import { FeaturedVenues } from '@/components/customer/home/FeaturedVenues';
import { HowItWorks } from '@/components/customer/home/HowItWorks';
import { Testimonials } from '@/components/customer/home/Testimonials';
import { AppDownload } from '@/components/customer/home/AppDownload';

export default function CustomerHomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            <HeroSection />
            <SportsCategories />
            <PromoBanner />
            <FeaturedVenues />
            <HowItWorks />
            <Testimonials />
            <AppDownload />
        </div>
    );
}

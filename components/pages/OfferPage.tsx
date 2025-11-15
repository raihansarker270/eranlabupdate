import React, { useContext } from 'react';
import OfferWallCard from '../OfferWallCard';
import { AppContext } from '../../App';

const SectionHeader: React.FC<{ title: string, description: string }> = ({ title, description }) => (
    <div className="flex justify-between items-center mb-6">
        <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
            <p className="text-slate-500 dark:text-slate-400">{description}</p>
        </div>
    </div>
);

const OfferPage: React.FC = () => {
    const { offerWalls } = useContext(AppContext);

    return (
        <div className="space-y-8">
            <section>
                <SectionHeader title="Offer Walls" description="Each offer wall contains hundreds of offers to complete" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                     {offerWalls.map((wall) => (
                        <OfferWallCard key={wall.name} wall={wall} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default OfferPage;

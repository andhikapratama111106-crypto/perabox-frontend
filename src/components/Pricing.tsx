import React from 'react';

interface PricingProps {
    onBook?: (serviceId?: string) => void;
}

const Pricing: React.FC<PricingProps> = ({ onBook }) => {
    const plans = [
        {
            id: 'basic-maintenance', // Placeholder IDs
            name: "Basic Maintenance",
            price: "Rp 150.000",
            description: "Essential home maintenance services",
            features: [
                "Light fixture repair",
                "Drain cleaning",
                "General inspection",
                "Basic cleaning"
            ],
            color: "bg-beige-dark/10",
            buttonColor: "bg-primary"
        },
        {
            id: 'premium-care',
            name: "Premium Care",
            price: "Rp 450.000",
            description: "Comprehensive home care solution",
            features: [
                "AC Maintenance",
                "Deep cleaning",
                "Plumbing overhaul",
                "Electrical safety check"
            ],
            color: "bg-primary/10",
            buttonColor: "bg-primary",
            highlighted: true
        },
        {
            id: 'expert-rescue',
            name: "Expert Rescue",
            price: "Rp 850.000",
            description: "Advanced repair and installation",
            features: [
                "Full home sanitization",
                "Smart home installation",
                "Roof leak repair",
                "Water heater service"
            ],
            color: "bg-beige-dark/10",
            buttonColor: "bg-primary"
        }
    ];

    return (
        <section id="pricing" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="text-sm uppercase tracking-wider text-gray-500 mb-2 block">Our Pricing</span>
                    <h2 className="text-4xl font-bold text-dark mb-4">Simple, Transparent Pricing</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Choose the plan that best fits your needs. No hidden fees, just professional service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative p-8 rounded-3xl border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1 ${plan.highlighted ? 'ring-2 ring-primary bg-white scale-105 z-10' : 'bg-white'
                                }`}
                        >
                            {plan.highlighted && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
                                    Most Popular
                                </span>
                            )}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-dark mb-2">{plan.name}</h3>
                                <div className="flex items-baseline mb-4">
                                    <span className="text-4xl font-bold text-dark">{plan.price}</span>
                                    <span className="text-gray-500 ml-2">/visit</span>
                                </div>
                                <p className="text-sm text-gray-500">{plan.description}</p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-center text-sm text-gray-600">
                                        <svg className="w-5 h-5 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 rounded-xl font-bold transition-all ${plan.highlighted
                                        ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20'
                                        : 'bg-gray-50 text-dark hover:bg-gray-100 border border-gray-200'
                                    }`}
                                onClick={() => onBook ? onBook(plan.id) : window.location.href = '/book'}
                            >
                                Book Now
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Pricing;

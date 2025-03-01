
import { useEffect, useState } from "react";
import { animateOnScroll } from "../lib/animations";
import { Check, ChevronRight } from "lucide-react";

const resorts = [
  {
    id: 1,
    name: "Riverside Retreat",
    description:
      "Luxury cottages perched right on the banks of the Kali river. Wake up to the sound of flowing water and birds chirping.",
    price: 12000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: [
      "River view rooms",
      "Private balcony",
      "In-house restaurant",
      "Wi-Fi",
      "Adventure activities",
    ],
  },
  {
    id: 2,
    name: "Jungle Paradise",
    description:
      "Set deep in the heart of the jungle, these luxury tents offer an immersive wildlife experience without compromising on comfort.",
    price: 8500,
    image:
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: [
      "Luxury tents",
      "Guided jungle walks",
      "Campfire",
      "Organic food",
      "Bird watching",
    ],
  },
  {
    id: 3,
    name: "Treetop Villas",
    description:
      "Elevated wooden villas with panoramic views of the forest canopy. Experience a unique stay amidst the treetops.",
    price: 15000,
    image:
      "https://images.unsplash.com/photo-1470165473808-c2b80d4591d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    amenities: [
      "Panoramic views",
      "Private deck",
      "Luxury bathroom",
      "Room service",
      "Nature activities",
    ],
  },
];

const Resorts = () => {
  const [activeResort, setActiveResort] = useState<number | null>(null);

  useEffect(() => {
    const cleanup = animateOnScroll(".resort-card", "animate-fade-in", {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px",
    });

    return cleanup;
  }, []);

  return (
    <section id="resorts" className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 resort-card">
          <h2 className="section-title text-dandeli-green">Our Resorts</h2>
          <p className="section-subtitle">
            Choose from our handpicked collection of luxury resorts, each offering a unique way
            to experience the beauty of Dandeli.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {resorts.map((resort, index) => (
            <div
              key={resort.id}
              className="resort-card opacity-0 bg-white rounded-3xl overflow-hidden card-shadow group hover:shadow-lg transition-all duration-500 border border-gray-100"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setActiveResort(resort.id)}
              onMouseLeave={() => setActiveResort(null)}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={resort.image}
                  alt={resort.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-medium text-dandeli-black mb-2">{resort.name}</h3>
                <p className="text-dandeli-dark-gray/80 mb-4 text-sm">{resort.description}</p>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-dandeli-dark-gray/60">Amenities</span>
                  </div>
                  <ul className="space-y-1">
                    {resort.amenities.map((amenity, aIndex) => (
                      <li key={aIndex} className="flex items-center text-sm text-dandeli-dark-gray/80">
                        <Check size={14} className="text-dandeli-green mr-2" />
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div>
                    <span className="text-dandeli-green font-medium text-lg">
                      ₹{resort.price.toLocaleString()}
                    </span>
                    <span className="text-dandeli-dark-gray/60 text-sm"> / night</span>
                  </div>
                  
                  <a
                    href="#booking"
                    className="flex items-center text-dandeli-green hover:text-dandeli-light-green font-medium transition-colors"
                  >
                    <span>Book Now</span>
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resorts;


import { useEffect } from "react";
import { animateOnScroll } from "../lib/animations";
import { Compass, Leaf, Droplets, MapPin } from "lucide-react";

const About = () => {
  useEffect(() => {
    const cleanup = animateOnScroll(".animate-item", "animate-fade-in", {
      threshold: 0.2,
    });

    return cleanup;
  }, []);

  return (
    <section id="about" className="section-padding bg-dandeli-beige overflow-hidden">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16 animate-item opacity-0">
          <h2 className="section-title text-dandeli-green">About Dandeli</h2>
          <p className="section-subtitle">
            Discover Karnataka's best-kept secret, a paradise of adventure and natural beauty
            nestled among the Western Ghats.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="animate-item opacity-0">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518495973542-4542c06a5843?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
                  alt="Dandeli Wildlife Sanctuary"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl max-w-xs">
                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="text-dandeli-green" />
                  <h3 className="font-medium text-lg">Explore the Wild</h3>
                </div>
                <p className="text-dandeli-dark-gray/80 text-sm">
                  Home to diverse wildlife, including black panthers, elephants, tigers, 
                  and over 300 species of birds.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 animate-item opacity-0">
            <h3 className="text-2xl md:text-3xl font-medium text-dandeli-green">
              A Sanctuary of Adventures & Tranquility
            </h3>
            <p className="text-dandeli-dark-gray/80">
              Nestled in the Western Ghats of Karnataka, Dandeli is a paradise for nature 
              lovers and adventure seekers alike. The dense forests, the majestic Kali 
              river, and the diverse wildlife create a perfect blend of thrill and tranquility.
            </p>
            <p className="text-dandeli-dark-gray/80">
              Our luxury resorts are strategically located to offer you the best of 
              Dandeli - close enough to adventure spots yet secluded enough to ensure 
              privacy and peace. Wake up to bird songs, spend your days exploring the 
              wilderness, and unwind under the starlit sky.
            </p>

            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                {
                  icon: <Compass className="h-6 w-6 text-dandeli-green" />,
                  title: "Adventure Sports",
                  description: "From white water rafting to kayaking and coracle rides",
                },
                {
                  icon: <Leaf className="h-6 w-6 text-dandeli-green" />,
                  title: "Nature Trails",
                  description: "Guided jungle walks and bird watching excursions",
                },
                {
                  icon: <Droplets className="h-6 w-6 text-dandeli-green" />,
                  title: "Kali River",
                  description: "One of the most beautiful rivers in the Western Ghats",
                },
                {
                  icon: <MapPin className="h-6 w-6 text-dandeli-green" />,
                  title: "Wildlife",
                  description: "Home to black panthers, elephants, and 300+ bird species",
                },
              ].map((feature, index) => (
                <div key={index} className="border border-dandeli-green/20 rounded-xl p-4 bg-white shadow-sm">
                  <div className="mb-2">{feature.icon}</div>
                  <h4 className="font-medium text-dandeli-dark-gray">{feature.title}</h4>
                  <p className="text-sm text-dandeli-dark-gray/80 mt-1">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

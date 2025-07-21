
import { useState } from 'react';
import CustomCursor from '@/components/CustomCursor';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [showBooking, setShowBooking] = useState(false);
  
  const handleBookNow = () => {
    setShowBooking(true);
    toast({
      title: "Coming Soon!",
      description: "Booking functionality will be available soon.",
      variant: "default",
    });
  };

  return (
    <div className="min-h-screen bg-dandeli-beige relative overflow-hidden">
      <CustomCursor />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-dandeli-green/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544957992-20514f595d6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">Dandeli Adventures</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-fade-in">Experience the thrill of nature in the heart of the Western Ghats</p>
          <Button 
            onClick={handleBookNow}
            className="btn-primary text-lg px-8 py-3 animate-fade-in"
          >
            Book Your Adventure
          </Button>
        </div>
      </section>
      
      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dandeli-green">Discover Dandeli</h2>
              <p className="text-dandeli-dark-gray mb-4">
                Nestled in the Western Ghats of Karnataka, Dandeli is a paradise for nature lovers and adventure enthusiasts. 
                Our resort offers the perfect blend of comfort and wilderness experience.
              </p>
              <p className="text-dandeli-dark-gray mb-6">
                From white water rafting to wildlife safaris, bird watching to kayaking, we provide a range of activities 
                to make your stay memorable and exciting.
              </p>
              <Button variant="outline" className="btn-secondary">Learn More</Button>
            </div>
            <div className="md:w-1/2 rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1629968417850-3505f5180761?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80" 
                alt="Dandeli River" 
                className="w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Resort Quick View */}
      <section className="py-16 bg-dandeli-beige">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-dandeli-green">Our Accommodations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Riverside Cottage",
                price: "₹5,500",
                image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Cozy cottages with a scenic view of the Kali river."
              },
              {
                title: "Jungle Tree House",
                price: "₹7,200",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Experience living amidst the treetops in our luxury tree houses."
              },
              {
                title: "Luxury Tents",
                price: "₹4,800",
                image: "https://images.unsplash.com/photo-1563299796-17596ed6b017?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80",
                description: "Glamping experience with all modern amenities in the wilderness."
              }
            ].map((resort, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-2">
                <div className="h-56 overflow-hidden">
                  <img src={resort.image} alt={resort.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-dandeli-green">{resort.title}</h3>
                    <span className="text-dandeli-brown font-bold">{resort.price}/night</span>
                  </div>
                  <p className="text-dandeli-dark-gray mb-4">{resort.description}</p>
                  <Button onClick={handleBookNow} className="w-full btn-primary">Book Now</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-dandeli-green text-white py-12">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Dandeli Adventures</h3>
              <p className="mb-2">The ultimate adventure resort in the Western Ghats</p>
              <p>Dandeli, Karnataka, India - 581325</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <p className="mb-2">Phone: +91 8277385225</p>
              <p className="mb-2">Email: dandeliadventuresoriginal@gmail.com</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-dandeli-beige transition-colors">Facebook</a>
                <a href="#" className="hover:text-dandeli-beige transition-colors">Instagram</a>
                <a href="#" className="hover:text-dandeli-beige transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p>© {new Date().getFullYear()} Dandeli Adventures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

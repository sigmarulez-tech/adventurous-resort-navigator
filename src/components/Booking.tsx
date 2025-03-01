
import { useState, useEffect } from "react";
import { useBooking } from "../hooks/useBooking";
import { X, Calendar, Users, Check } from "lucide-react";
import { animateOnScroll } from "../lib/animations";

const addOns = [
  { id: "adventure", name: "Adventure Package", price: 2500, description: "White water rafting, kayaking, and more" },
  { id: "meals", name: "Meals", price: 1500, description: "All meals included with authentic local cuisine" },
  { id: "transport", name: "Transport", price: 1000, description: "Pickup and drop from Dandeli town" },
  { id: "spa", name: "Spa Services", price: 3000, description: "Relaxing spa treatments with natural ingredients" },
];

const Booking = () => {
  const [tab, setTab] = useState<"form" | "bookings">("form");
  
  const {
    formData,
    errors,
    isSubmitting,
    bookingCosts,
    showConfirmation,
    bookings,
    handleChange,
    handleSubmit,
    resetForm,
    setShowConfirmation,
  } = useBooking();

  useEffect(() => {
    const cleanup = animateOnScroll(".booking-animate", "animate-fade-in", {
      threshold: 0.2,
    });

    return cleanup;
  }, []);

  return (
    <section id="booking" className="section-padding bg-dandeli-beige">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12 booking-animate opacity-0">
          <h2 className="section-title text-dandeli-green">Book Your Stay</h2>
          <p className="section-subtitle">
            Reserve your adventure in Dandeli's wilderness with our easy booking process.
          </p>
        </div>

        <div className="flex border-b border-dandeli-green/20 mb-10 booking-animate opacity-0">
          <button
            onClick={() => setTab("form")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              tab === "form"
                ? "border-b-2 border-dandeli-green text-dandeli-green"
                : "text-dandeli-dark-gray hover:text-dandeli-green"
            }`}
          >
            New Booking
          </button>
          <button
            onClick={() => setTab("bookings")}
            className={`px-6 py-3 font-medium text-sm transition-colors ${
              tab === "bookings"
                ? "border-b-2 border-dandeli-green text-dandeli-green"
                : "text-dandeli-dark-gray hover:text-dandeli-green"
            }`}
          >
            My Bookings
          </button>
        </div>

        {tab === "form" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 booking-animate opacity-0">
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 card-shadow">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="checkIn" className="block text-sm font-medium text-dandeli-dark-gray">
                        Check-in Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="checkIn"
                          name="checkIn"
                          value={formData.checkIn}
                          onChange={handleChange}
                          min={new Date().toISOString().split("T")[0]}
                          className={`w-full p-3 border ${
                            errors.checkIn ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none`}
                          required
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dandeli-dark-gray/60" size={18} />
                      </div>
                      {errors.checkIn && <p className="text-red-500 text-xs mt-1">{errors.checkIn}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="checkOut" className="block text-sm font-medium text-dandeli-dark-gray">
                        Check-out Date *
                      </label>
                      <div className="relative">
                        <input
                          type="date"
                          id="checkOut"
                          name="checkOut"
                          value={formData.checkOut}
                          onChange={handleChange}
                          min={formData.checkIn || new Date().toISOString().split("T")[0]}
                          className={`w-full p-3 border ${
                            errors.checkOut ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none`}
                          required
                        />
                        <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dandeli-dark-gray/60" size={18} />
                      </div>
                      {errors.checkOut && <p className="text-red-500 text-xs mt-1">{errors.checkOut}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="guests" className="block text-sm font-medium text-dandeli-dark-gray">
                        Number of Guests *
                      </label>
                      <div className="relative">
                        <select
                          id="guests"
                          name="guests"
                          value={formData.guests}
                          onChange={handleChange}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none appearance-none"
                          required
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </option>
                          ))}
                        </select>
                        <Users className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dandeli-dark-gray/60" size={18} />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="roomType" className="block text-sm font-medium text-dandeli-dark-gray">
                        Resort *
                      </label>
                      <select
                        id="roomType"
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none appearance-none"
                        required
                      >
                        <option value="Riverside Retreat">Riverside Retreat</option>
                        <option value="Jungle Paradise">Jungle Paradise</option>
                        <option value="Treetop Villas">Treetop Villas</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-dandeli-dark-gray">Add-ons (Optional)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addOns.map((addon) => (
                        <div
                          key={addon.id}
                          className={`border rounded-xl p-4 cursor-pointer transition-all ${
                            formData.addOns.includes(addon.name)
                              ? "border-dandeli-green bg-dandeli-green/5"
                              : "border-gray-200 hover:border-dandeli-green/50"
                          }`}
                        >
                          <label className="flex items-start cursor-pointer">
                            <input
                              type="checkbox"
                              name="addOns"
                              value={addon.name}
                              checked={formData.addOns.includes(addon.name)}
                              onChange={handleChange}
                              className="sr-only"
                            />
                            <span
                              className={`w-5 h-5 rounded-md flex items-center justify-center mr-3 mt-0.5 ${
                                formData.addOns.includes(addon.name)
                                  ? "bg-dandeli-green text-white"
                                  : "border border-gray-300"
                              }`}
                            >
                              {formData.addOns.includes(addon.name) && <Check size={12} />}
                            </span>
                            <div>
                              <div className="font-medium text-dandeli-black">{addon.name}</div>
                              <div className="text-xs text-dandeli-dark-gray/70">{addon.description}</div>
                              <div className="text-sm font-medium text-dandeli-green mt-1">₹{addon.price}</div>
                            </div>
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-100">
                    <h3 className="text-lg font-medium text-dandeli-dark-gray mb-4">Contact Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-dandeli-dark-gray">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full p-3 border ${
                            errors.name ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none`}
                          required
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-dandeli-dark-gray">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full p-3 border ${
                            errors.email ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none`}
                          required
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label htmlFor="phone" className="block text-sm font-medium text-dandeli-dark-gray">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full p-3 border ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          } rounded-lg focus:ring-2 focus:ring-dandeli-green/50 focus:border-dandeli-green focus:outline-none`}
                          required
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary bg-dandeli-green hover:bg-dandeli-light-green disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Processing..." : "Book Now"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            
            <div className="booking-animate opacity-0">
              <div className="bg-white rounded-3xl p-8 card-shadow sticky top-24">
                <h3 className="text-xl font-medium text-dandeli-black mb-6">Booking Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-dandeli-dark-gray">Resort:</span>
                    <span className="font-medium text-dandeli-black">{formData.roomType}</span>
                  </div>
                  
                  {formData.checkIn && formData.checkOut && (
                    <div className="flex justify-between text-sm">
                      <span className="text-dandeli-dark-gray">Dates:</span>
                      <span className="font-medium text-dandeli-black">
                        {new Date(formData.checkIn).toLocaleDateString()} - {new Date(formData.checkOut).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-dandeli-dark-gray">Guests:</span>
                    <span className="font-medium text-dandeli-black">{formData.guests}</span>
                  </div>
                  
                  {formData.addOns.length > 0 && (
                    <div className="text-sm">
                      <span className="text-dandeli-dark-gray">Add-ons:</span>
                      <ul className="mt-1 space-y-1">
                        {formData.addOns.map((addon) => (
                          <li key={addon} className="flex justify-between">
                            <span>{addon}</span>
                            <span className="font-medium">
                              ₹{
                                addOns.find((a) => a.name === addon)?.price.toLocaleString() || 0
                              }
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                
                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-dandeli-dark-gray">Room Cost:</span>
                    <span className="font-medium text-dandeli-black">
                      ₹{bookingCosts.roomCost.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-dandeli-dark-gray">Add-ons Cost:</span>
                    <span className="font-medium text-dandeli-black">
                      ₹{bookingCosts.addOnsCost.toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="flex justify-between pt-3 border-t border-gray-100 text-dandeli-green">
                    <span className="font-medium">Total Cost:</span>
                    <span className="font-bold text-lg">
                      ₹{bookingCosts.totalCost.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="booking-animate opacity-0">
            <div className="bg-white rounded-3xl p-8 card-shadow">
              <h3 className="text-xl font-medium text-dandeli-black mb-6">My Bookings</h3>
              
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-dandeli-dark-gray/70 mb-4">You don't have any bookings yet.</p>
                  <button
                    onClick={() => setTab("form")}
                    className="btn-secondary"
                  >
                    Make a Booking
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {bookings.map((booking, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-medium text-lg text-dandeli-black">{booking.roomType}</h4>
                        <span className="text-xs font-medium bg-dandeli-green/10 text-dandeli-green px-3 py-1 rounded-full">
                          Confirmed
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-dandeli-dark-gray/70">Check-in</p>
                          <p className="font-medium">{new Date(booking.checkIn).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-dandeli-dark-gray/70">Check-out</p>
                          <p className="font-medium">{new Date(booking.checkOut).toLocaleDateString()}</p>
                        </div>
                        
                        <div>
                          <p className="text-xs text-dandeli-dark-gray/70">Guests</p>
                          <p className="font-medium">{booking.guests}</p>
                        </div>
                      </div>
                      
                      {booking.addOns.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-dandeli-dark-gray/70 mb-1">Add-ons</p>
                          <div className="flex flex-wrap gap-2">
                            {booking.addOns.map((addon, idx) => (
                              <span key={idx} className="text-xs bg-dandeli-beige px-3 py-1 rounded-full">
                                {addon}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="text-xs text-dandeli-dark-gray/70">Booked by</p>
                          <p className="font-medium">{booking.name}</p>
                        </div>
                        
                        <button className="text-sm text-dandeli-green hover:text-dandeli-light-green font-medium">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-scale-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-medium text-dandeli-black">Booking Confirmed!</h3>
              <button
                onClick={() => setShowConfirmation(false)}
                className="text-dandeli-dark-gray hover:text-dandeli-black"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-dandeli-green/10 flex items-center justify-center">
                <Check size={32} className="text-dandeli-green" />
              </div>
            </div>
            
            <p className="text-center text-dandeli-dark-gray mb-6">
              Your booking at {formData.roomType} has been confirmed. We've sent a confirmation email to {formData.email}.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-dandeli-dark-gray">Check-in:</span>
                <span className="font-medium">{new Date(formData.checkIn).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-dandeli-dark-gray">Check-out:</span>
                <span className="font-medium">{new Date(formData.checkOut).toLocaleDateString()}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-dandeli-dark-gray">Total Amount:</span>
                <span className="font-medium">₹{bookingCosts.totalCost.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  resetForm();
                }}
                className="btn-primary w-full"
              >
                New Booking
              </button>
              
              <button
                onClick={() => {
                  setShowConfirmation(false);
                  setTab("bookings");
                }}
                className="btn-secondary w-full"
              >
                View My Bookings
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Booking;

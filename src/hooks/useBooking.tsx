
import { useState, useEffect } from "react";

export interface BookingFormData {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
  addOns: string[];
  name: string;
  email: string;
  phone: string;
}

interface UseBookingProps {
  onSubmitSuccess?: (data: BookingFormData) => void;
}

interface BookingCosts {
  roomCost: number;
  addOnsCost: number;
  totalCost: number;
}

const roomPrices = {
  "Riverside Retreat": 12000,
  "Jungle Paradise": 8500,
  "Treetop Villas": 15000,
};

const addOnPrices = {
  "Adventure Package": 2500,
  "Meals": 1500,
  "Transport": 1000,
  "Spa Services": 3000,
};

const initialFormData: BookingFormData = {
  checkIn: "",
  checkOut: "",
  guests: 2,
  roomType: "Riverside Retreat",
  addOns: [],
  name: "",
  email: "",
  phone: "",
};

export const useBooking = ({ onSubmitSuccess }: UseBookingProps = {}) => {
  const [formData, setFormData] = useState<BookingFormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [bookingCosts, setBookingCosts] = useState<BookingCosts>({
    roomCost: 0,
    addOnsCost: 0,
    totalCost: 0,
  });
  const [bookings, setBookings] = useState<BookingFormData[]>([]);

  // Load bookings from localStorage
  useEffect(() => {
    const savedBookings = localStorage.getItem("dandeliBookings");
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, []);

  // Update costs when form data changes
  useEffect(() => {
    const roomCost = roomPrices[formData.roomType as keyof typeof roomPrices] || 0;
    
    let addOnsCost = 0;
    formData.addOns.forEach((addOn) => {
      addOnsCost += addOnPrices[addOn as keyof typeof addOnPrices] || 0;
    });
    
    // Calculate number of nights
    let numberOfNights = 1;
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      numberOfNights = numberOfNights > 0 ? numberOfNights : 1;
    }
    
    const totalRoomCost = roomCost * numberOfNights;
    
    setBookingCosts({
      roomCost: totalRoomCost,
      addOnsCost,
      totalCost: totalRoomCost + addOnsCost,
    });
  }, [formData]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};
    
    // Required fields
    if (!formData.checkIn) newErrors.checkIn = "Check-in date is required";
    if (!formData.checkOut) newErrors.checkOut = "Check-out date is required";
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    
    // Date validation
    if (formData.checkIn && formData.checkOut) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      
      if (checkInDate < today) {
        newErrors.checkIn = "Check-in date cannot be in the past";
      }
      
      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out date must be after check-in date";
      }
    }
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    // Phone validation
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      const { checked } = checkbox;
      
      setFormData((prev) => {
        const addOns = [...prev.addOns];
        
        if (checked) {
          addOns.push(value);
        } else {
          const index = addOns.indexOf(value);
          if (index !== -1) {
            addOns.splice(index, 1);
          }
        }
        
        return { ...prev, addOns };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Clear error when field is edited
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        // Save to localStorage
        const updatedBookings = [...bookings, formData];
        localStorage.setItem("dandeliBookings", JSON.stringify(updatedBookings));
        setBookings(updatedBookings);
        
        setIsSubmitting(false);
        setShowConfirmation(true);
        
        if (onSubmitSuccess) {
          onSubmitSuccess(formData);
        }
      }, 1000);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
    setShowConfirmation(false);
  };

  return {
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
  };
};

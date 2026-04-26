export interface Service {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  icon?: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "traffic-control-cleanup",
    title: "Traffic Control & Cleanup",
    description: "Rapid response traffic management and accident site restoration.",
    longDescription: "Our specialized traffic control team ensures the safety of motorists and first responders at accident scenes. We provide comprehensive cleanup services to remove debris and fluids, restoring the roadway to safe conditions as quickly as possible.",
    image: "https://images.unsplash.com/photo-1571677246347-5040036b95cc?auto=format&fit=crop&q=80&w=1000",
    features: [
      "24/7 Emergency Response",
      "Certified Traffic Control Personnel",
      "Hazmat Cleanup Capabilities",
      "Debris Removal & Sweeping",
      "Coordinated Law Enforcement Liaison"
    ]
  },
  {
    id: "roadside-servicing",
    title: "Roadside Servicing",
    description: "Fuel delivery, jump starts, and minor mechanical repairs on the spot.",
    longDescription: "Getting back on the road shouldn't always require a tow. Our roadside servicing team is equipped to handle common vehicle issues right where you are. From battery jump-starts to fuel delivery and tire changes, we bring the solution to you.",
    image: "https://images.unsplash.com/photo-1617469165786-8007eda3caa7?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Battery Jump-Starts",
      "Flat Tire Assistance",
      "Fuel & Fluid Delivery",
      "Lockout Recovery",
      "Minor Mechanical Troubleshooting"
    ]
  },
  {
    id: "towing-recovery",
    title: "Towing & Recovery",
    description: "Standard and specialized vehicle transport for all makes and models.",
    longDescription: "Apex provides professional towing and recovery for all vehicle types. Whether your car has suffered mechanical failure or was involved in an accident, our modern fleet ensures damage-free transport to your preferred destination.",
    image: "https://images.unsplash.com/photo-1565191999001-551c187427bb?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Local & Long Distance Towing",
      "Accident Recovery Experts",
      "Wheel-Lift & Flatbed Options",
      "Secure Storage Facilities",
      "Exotic & Luxury Vehicle Handling"
    ]
  },
  {
    id: "trailer-towing-recovery",
    title: "Trailer Towing & Recovery",
    description: "Heavy-duty towing for trailers, RVs, and commercial equipment.",
    longDescription: "Our heavy-duty division specializes in the transport and recovery of large trailers, recreational vehicles, and commercial cargo. We have the capability to handle complex recoveries involving overturned trailers and heavy machinery.",
    image: "https://images.unsplash.com/photo-1621252179027-94459d278660?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Heavy-Duty Recovery Units",
      "RV & Motorhome Transport",
      "Commercial Trailer Specialists",
      "Load Transfers & Swaps",
      "Winching & Uprighting Services"
    ]
  },
  {
    id: "exterior-truck-wash",
    title: "Exterior Automatic & Manual Truck Wash",
    description: "High-pressure, touchless and manual exterior cleaning for commercial fleets.",
    longDescription: "Keep your fleet looking professional with Apex's advanced truck wash facilities. We offer both automated touchless systems for efficiency and detailed manual washing for complex grime, ensuring your brand stays bright on the road.",
    image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Touchless Automated Systems",
      "High-Pressure Manual Detailing",
      "Undercarriage Degreasing",
      "Fleet Maintenance Programs",
      "Environmentally Friendly Solvents"
    ]
  },
  {
    id: "interior-truck-cleaning",
    title: "Interior Truck Cleaning",
    description: "Deep interior sanitation and detailing for long-haul cabs.",
    longDescription: "Clean cabs are healthier and more comfortable for drivers. Our interior cleaning service provides deep sanitation of upholstery, dashboard restoration, and odor removal, providing a fresh workspace for professional operators.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=1000",
    features: [
      "Steam Sanitation & HEPA Vacuuming",
      "Fabric & Leather Conditioning",
      "Ozone Odor Treatment",
      "Deep Surface Disinfection",
      "Window & Trim Detailing"
    ]
  }
];

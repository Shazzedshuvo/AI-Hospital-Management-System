// src/data/doctorsData.ts

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  category: 'General Physician' | 'Cardiologist' | 'Neurologist' | 'Pediatrician' | 'Dentist';
  isPremium: boolean;
  rating: number; // 0.0 to 5.0
  experience: number; // years
  fee: number; // Taka
  bio: string;
  imageUrl: string; // Placeholder for image URL
}

export const doctorsData: Doctor[] = [
  // --- 5 Free Doctors ---
  { id: 1, name: "Dr. Ahasan Habib", specialty: "Family Medicine Expert", category: 'General Physician', isPremium: false, rating: 4.8, experience: 12, fee: 0, bio: "Expert in treating general health issues and chronic diseases. Available for quick consultation.", imageUrl: "/doctor1.png" },
  { id: 2, name: "Dr. Nazmul Hasan", specialty: "Dental Surgeon", category: 'Dentist', isPremium: false, rating: 4.5, experience: 8, fee: 0, bio: "Specializes in routine check-ups and basic dental procedures.", imageUrl: "/images/doctor2.jpg" },
  { id: 3, name: "Dr. Sadia Afrin", specialty: "Child Specialist", category: 'Pediatrician', isPremium: false, rating: 4.9, experience: 15, fee: 0, bio: "Dedicated to the health and well-being of children from infancy through adolescence.", imageUrl: "/images/doctor3.jpg" },
  { id: 4, name: "Dr. Tarek Islam", specialty: "General Practitioner", category: 'General Physician', isPremium: false, rating: 4.0, experience: 5, fee: 0, bio: "Offers primary care services for common illnesses and minor injuries.", imageUrl: "/images/doctor4.jpg" },
  { id: 5, name: "Dr. Fahmida Khan", specialty: "Nerve Specialist (Junior)", category: 'Neurologist', isPremium: false, rating: 4.2, experience: 6, fee: 0, bio: "Focuses on common neurological issues like headaches and minor nerve pains.", imageUrl: "/images/doctor5.jpg" },

  // --- 10 Premium Doctors ---
  { id: 6, name: "Prof. Dr. Shakil Ahmed", specialty: "Senior Cardiologist", category: 'Cardiologist', isPremium: true, rating: 5.0, experience: 25, fee: 1500, bio: "One of the top cardiologists, specializing in complex cardiac interventions and bypass surgery.", imageUrl: "/images/doctor6.jpg" },
  { id: 7, name: "Dr. Rasheda Begum", specialty: "Advanced Neurologist", category: 'Neurologist', isPremium: true, rating: 4.7, experience: 18, fee: 1200, bio: "Highly experienced in treating complex brain and nervous system disorders, including stroke and epilepsy.", imageUrl: "/images/doctor7.jpg" },
  { id: 8, name: "Dr. Alomgir Hossain", specialty: "Pediatric Consultant", category: 'Pediatrician', isPremium: true, rating: 4.9, experience: 20, fee: 1000, bio: "A leading consultant in pediatric critical care and immunization.", imageUrl: "/images/doctor8.jpg" },
  { id: 9, name: "Dr. Taslima Akter", specialty: "Aesthetic Dentistry", category: 'Dentist', isPremium: true, rating: 4.6, experience: 10, fee: 800, bio: "Expert in cosmetic dentistry, veneers, and root canal treatment.", imageUrl: "/images/doctor9.jpg" },
  { id: 10, name: "Dr. Kamal Pasha", specialty: "Gastroenterologist", category: 'General Physician', isPremium: true, rating: 4.5, experience: 14, fee: 1100, bio: "Specializing in digestive system disorders and advanced endoscopy.", imageUrl: "/images/doctor10.jpg" },
  { id: 11, name: "Dr. Zarin Rahman", specialty: "Vascular Surgeon", category: 'Cardiologist', isPremium: true, rating: 4.8, experience: 22, fee: 1600, bio: "Expert in vascular health, treating diseases of the arteries and veins.", imageUrl: "/images/doctor11.jpg" },
  { id: 12, name: "Dr. Emon Chowdhury", specialty: "Child Psychiatrist", category: 'Pediatrician', isPremium: true, rating: 4.7, experience: 16, fee: 900, bio: "Provides specialized mental health care for children and adolescents.", imageUrl: "/images/doctor12.jpg" },
  { id: 13, name: "Dr. Jamil Hossain", specialty: "Orthodontist", category: 'Dentist', isPremium: true, rating: 4.9, experience: 11, fee: 1300, bio: "Focuses on correcting irregular teeth alignment and bite problems.", imageUrl: "/images/doctor13.jpg" },
  { id: 14, name: "Dr. Priti Sen", specialty: "Interventional Neurologist", category: 'Neurologist', isPremium: true, rating: 4.8, experience: 19, fee: 1400, bio: "Specialized in minimally invasive procedures for brain and spine conditions.", imageUrl: "/images/doctor14.jpg" },
  { id: 15, name: "Dr. Kazi Rafi", specialty: "Diabetologist", category: 'General Physician', isPremium: true, rating: 4.6, experience: 13, fee: 1000, bio: "Manages complex cases of diabetes and endocrinological disorders.", imageUrl: "/images/doctor15.jpg" },
];

export const allCategories: (Doctor['category'] | 'All')[] = [
  'All', 
  'General Physician', 
  'Cardiologist', 
  'Neurologist', 
  'Pediatrician', 
  'Dentist'
];
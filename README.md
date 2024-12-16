# AI-Powered Predictive Decision Support System (PDSS) for Healthcare Workers  

### **Overview**  
This project was developed using Google Cloud and Google AI technologies for the **AI for Impact Hackathon**. It aims to address critical challenges faced by healthcare workers, including language and cultural barriers, burnout, delayed detection of critical conditions, and inefficiencies in decision-making tools.  

Our solution is a comprehensive system comprising a **mobile application** and a **web platform**, designed to assist healthcare professionals in providing enhanced patient care, ensuring efficient workflows, and reducing burnout.  

---

## **Login Credentials**  

To test the application, you can use the following credentials:  

| Role           | Username       | Password       |
|----------------|----------------|----------------|
| **Doctor**     | `doctor`       | `doc123`       |
| **Nurse**      | `nurse`        | `nurse123`     |
| **Admin**      | `admin`        | `admin123`     |
| **Mental Health Worker** | `mentalhealth` | `mh123` |
| **Radiologist**| `radiologist`  | `rad123`       |
| **Paramedic**  | `paramedic`    | `para123`      |  

When you log in, you will gain role-based access to functionalities specifically tailored to the selected role.

---

## **Problem Statement**  
Healthcare workers face two major challenges:  
1. **Language and Cultural Barriers**: Miscommunication due to diverse languages and cultural differences leads to misdiagnoses, misunderstandings, and poor patient satisfaction.  
2. **Burnout and Inefficiency**: Overwhelming workloads, emotional strain, and inadequate tools for real-time decision-making and mental health support result in burnout and reduced quality of care.  

Additional challenges include delayed detection of critical conditions like sepsis or cardiac arrest and a lack of personalized, data-driven insights for patient care.  

---

## **Solution**  

### **Mobile Application**  
The mobile app, built using **Expo** and **React Native**, solves multilingual issues:  
- **Multilingual Conversational Assistant**: Enables seamless conversations between healthcare workers and patients across different languages.  
- **Features**:  
  - Speech-to-text and text-to-speech conversions for real-time translations.  
  - AI-powered voice replication for personalized communication.  
  - Automatic transcription of conversations for future reference.  

**Workflow**:  
- A healthcare worker (e.g., a doctor) communicates with a patient in their respective languages.  
- The app records the speech, converts it into text, and translates it into the patient’s language.  
- The patient replies in their native language, and the app performs the same process in reverse for the doctor.  
- The entire conversation is transcribed and logged for future reference.  

**Technologies Used**:  
- **Google Translation API**  
- **Google Cloud Speech-to-Text**  
- **Google Cloud Text-to-Speech**  

---

### **Web Application**  
The web platform, built using **Next.js** and **Firebase**, serves as a robust tool for all healthcare workers, ensuring role-based access control (RBAC) for secure data handling in compliance with **GDPR** and **HIPAA** guidelines.  

#### **Key Features**  
- **Doctors**:  
  - Track appointments and manage electronic health records (EHR).  
  - Use AI tools (Gemini and Vertex AI) for patient summaries and diagnosis assistance.  
- **Nurses**:  
  - Monitor patient care metrics, such as IV tracking.  
  - Manage healthcare schedules efficiently.  
- **Mental Health Professionals**:  
  - Access tools for mental health tracking and providing support to both patients and staff.  
- **Radiologists**:  
  - Use AI tools for analyzing diagnostic images and generating actionable insights.  
- **Paramedics**:  
  - Track emergency cases, log patient details, and manage handoffs with hospitals.  
- **Admin**:  
  - Oversee hospital workflows, manage staff roles, and ensure data security.  

**Technologies Used**:  
- **Next.js**  
- **Firebase**  
- **Google Cloud Vertex AI**  
- **Google Cloud Firestore**  

---

## **Impact**  
This solution has the potential to significantly enhance healthcare outcomes by:  
- **Breaking Language Barriers**: Ensuring effective communication between healthcare workers and patients, especially in diverse regions.  
- **Reducing Burnout**: Offering tools for real-time decision-making and mental health support to healthcare professionals.  
- **Improving Patient Care**: Enabling early detection of critical conditions and providing actionable, AI-powered insights.  

By integrating Google AI and Google Cloud technologies, this project streamlines healthcare workflows, reduces errors, and fosters a healthier work environment for healthcare professionals.  

---

## **How to Run the Application**  
1. **Mobile Application**:  
   - Clone the repository and navigate to the mobile app folder.  
   - Install dependencies using `npm install`.  
   - Run the app using `expo start`.  
   - Use the above credentials to log in and test the functionality.  

2. **Web Application**:  
   - Clone the repository and navigate to the web app folder.  
   - Install dependencies using `npm install`.  
   - Start the application with `npm run dev`.  
   - Open `http://localhost:3000` in your browser and log in using the above credentials.  

---

## **Future Scope**  
- Expand multilingual capabilities with dialect-specific models.  
- Integrate AI-powered mental health monitoring for healthcare workers.  
- Add real-time alert systems for critical patient conditions like sepsis.  
- Include camera-based patient monitoring for visual diagnostics.  
- Implement blockchain for secure patient data management.  

---

## **Conclusion**  
This project demonstrates how **Google AI and Cloud Technologies** can create transformative solutions for the healthcare sector. By addressing critical challenges, this system enhances efficiency, ensures better communication, and improves both patient outcomes and healthcare worker well-being.  

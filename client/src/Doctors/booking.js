// import React, { useState } from 'react';
// // import { useHistory } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckout from 'react-stripe-checkout';


// function BookingForm() {


//     const [formData, setFormData] = useState({
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredDate: '',
//         preferredTime: '',
//         chronicConditions: '',
//         medications: '',
//         allergies: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false
//     });
//     // const history = useHistory();

//     const [errors, setErrors] = useState({});
//     const [booking, setBooking] = useState({
//         name: "Booking for Doctor consultation",
//         price: 1500
//       });
    
//       const stripeKey = 'pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr'; // Replace with your Stripe public key
    
//       const onToken = async (token) => {
//         // Handle the received token, usually by sending it to your server
//         console.log('Payment Successful:', token);
//         const body = {
//             token
//         }

//           const response = await fetch('http://localhost:3001/booking/payment', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(body),
//         })
//         .then(response=> {
//           console.log(response)
//         })
//         .catch(err=>console.log(err))
//       }
    

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             isValid = false;
//             newErrors.fullName = 'Full name is required.';
//         }
//         if (!formData.dob) {
//             isValid = false;
//             newErrors.dob = 'Date of birth is required.';
//         }
//         if (!formData.gender) {
//             isValid = false;
//             newErrors.gender = 'Gender is required.';
//         }
//         if (!formData.email) {
//             isValid = false;
//             newErrors.email = 'Email address is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             isValid = false;
//             newErrors.email = 'Email address is invalid.';
//         }
//         if (!formData.phone) {
//             isValid = false;
//             newErrors.phone = 'Phone number is required.';
//         } else if (!/^\d{10}$/.test(formData.phone)) {
//             isValid = false;
//             newErrors.phone = 'Phone number must be 10 digits.';
//         }
//         if (!formData.consultationReason.trim()) {
//             isValid = false;
//             newErrors.consultationReason = 'Reason for consultation is required.';
//         }
//         if (!formData.preferredDate) {
//             isValid = false;
//             newErrors.preferredDate = 'Preferred date of consultation is required.';
//         }
//         if (!formData.preferredTime) {
//             isValid = false;
//             newErrors.preferredTime = 'Preferred time slot is required.';
//         }
//         if (!formData.preferredLanguage) {
//             isValid = false;
//             newErrors.preferredLanguage = 'Preferred language is required.';
//         }
//         if (!formData.visitedBefore) {
//             isValid = false;
//             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//         }
//         if (!formData.consent) {
//             isValid = false;
//             newErrors.consent = 'You must give your consent to proceed.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr');

//     const handleSubmit = async (e) => {
//         //     e.preventDefault();
//         //     if (!validateForm()) return;

//         //     console.log('Form submitted:', formData);
//         //     fetch('http://localhost:3001/consult/create', {
//         //         method: 'POST',
//         //         headers: { 'Content-Type': 'application/json' },
//         //         body: JSON.stringify(formData),
//         //     })
//         //     .then(res => res.json())
//         //     .then(() => {
//         //         alert('Booking successful!');
//         //         history.push('/doctors/Booking/payment');
//         //     })        .catch(error => console.error('Error:', error));
//         // };
//      e.preventDefault();
// if (!validateForm()) return;

// console.log('Form submitted:', formData);
// const stripe = await stripePromise;
// try {
//     const response = await fetch('http://localhost:3001/consult/create', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//     });
    
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }

//     const session = await response.json();

//     // Redirect to Stripe Checkout page
//     const result = stripe.redirectToCheckout({
//         sessionId: session.id,
//     });

//     if (result.error) {
//         console.error("Error:", result.error.message);
//     }
// } catch (error) {
//     console.error('Fetch Error:', error);
// }

//     };

//     return (
//         <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)' }}>
//             <div className="container">
//                 <form onSubmit={handleSubmit}>
//                     <h1 style={{ color: '#0e0737', fontWeight: 'bold', textAlign: 'center' }}>Book the Appointment</h1>

//                     <label>Full Name:</label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         style={errors.fullName ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}

//                     <label>Date of Birth:</label>
//                     <input
//                         type="date"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleChange}
//                         style={errors.dob ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.dob && <div style={{ color: 'red' }}>{errors.dob}</div>}

//                     <label>Gender:</label>
//                     <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         style={errors.gender ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                     </select>
//                     {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}

//                     <label>Email Address:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         style={errors.email ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

//                     <label>Phone Number:</label>
//                     <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         style={errors.phone ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}

//                     <label>Reason for Consultation:</label>
//                     <textarea
//                         name="consultationReason"
//                         value={formData.consultationReason}
//                         onChange={handleChange}
//                         style={errors.consultationReason ? { border: '1px solid red' } : {}}
//                     ></textarea>
//                     {errors.consultationReason && <div style={{ color: 'red' }}>{errors.consultationReason}</div>}

//                     <label>Preferred Date of Consultation:</label>
//                     <input
//                         type="date"
//                         name="preferredDate"
//                         value={formData.preferredDate}
//                         onChange={handleChange}
//                         style={errors.preferredDate ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.preferredDate && <div style={{ color: 'red' }}>{errors.preferredDate}</div>}

//                     <label>Preferred Time Slot:</label>
//                     <select
//                         name="preferredTime"
//                         value={formData.preferredTime}
//                         onChange={handleChange}
//                         style={errors.preferredTime ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="morning">Morning (9 AM - 12 PM)</option>
//                         <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
//                         <option value="evening">Evening (5 PM - 8 PM)</option>
//                     </select>
//                     {errors.preferredTime && <div style={{ color: 'red' }}>{errors.preferredTime}</div>}

//                     <label>Preferred Language for Consultation:</label>
//                     <select
//                         name="preferredLanguage"
//                         value={formData.preferredLanguage}
//                         onChange={handleChange}
//                         style={errors.preferredLanguage ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="English">English</option>
//                         <option value="Spanish">Spanish</option>
//                         <option value="Other">Other</option>
//                     </select>
//                     {errors.preferredLanguage && <div style={{ color: 'red' }}>{errors.preferredLanguage}</div>}

//                     <label>Have you visited our clinic before?</label>
//                     <select
//                         name="visitedBefore"
//                         value={formData.visitedBefore}
//                         onChange={handleChange}
//                         style={errors.visitedBefore ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="yes">Yes</option>
//                         <option value="no">No</option>
//                     </select>
//                     {errors.visitedBefore && <div style={{ color: 'red' }}>{errors.visitedBefore}</div>}

//                     <label>
//                         <input
//                             type="checkbox"
//                             name="consent"
//                             checked={formData.consent}
//                             onChange={handleChange}
//                         />
//                         I consent to my data being used for the purpose of scheduling an online consultation.
//                     </label>
//                     {errors.consent && <div style={{ color: 'red' }}>{errors.consent}</div>}

//                     <div>
//       <StripeCheckout
//         stripeKey="pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr"
//         token={onToken}
//         name={booking.name}
//         amount={booking.price * 100} // Stripe expects the amount in cents
//         currency="LKR"
//          // or the currency of your choice
//       />
//     </div>                </form>
//             </div>
//         </div>
//     );
// }

// export default BookingForm;
// import React, { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckout from 'react-stripe-checkout';

// const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr');

// function BookingForm() {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         dob: '',
//         gender: '',
//         email: '',
//         phone: '',
//         consultationReason: '',
//         preferredDate: '',
//         preferredTime: '',
//         chronicConditions: '',
//         medications: '',
//         allergies: '',
//         preferredLanguage: '',
//         visitedBefore: '',
//         consent: false
//     });

//     const [errors, setErrors] = useState({});
//     const [booking, setBooking] = useState({
//         name: "Booking for Doctor consultation",
//         price: 1500
//     });

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const validateForm = () => {
//         let newErrors = {};
//         let isValid = true;

//         if (!formData.fullName.trim()) {
//             isValid = false;
//             newErrors.fullName = 'Full name is required.';
//         }
//         if (!formData.dob) {
//             isValid = false;
//             newErrors.dob = 'Date of birth is required.';
//         }
//         if (!formData.gender) {
//             isValid = false;
//             newErrors.gender = 'Gender is required.';
//         }
//         if (!formData.email) {
//             isValid = false;
//             newErrors.email = 'Email address is required.';
//         } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//             isValid = false;
//             newErrors.email = 'Email address is invalid.';
//         }
//         if (!formData.phone) {
//             isValid = false;
//             newErrors.phone = 'Phone number is required.';
//         } else if (!/^\d{10}$/.test(formData.phone)) {
//             isValid = false;
//             newErrors.phone = 'Phone number must be 10 digits.';
//         }
//         if (!formData.consultationReason.trim()) {
//             isValid = false;
//             newErrors.consultationReason = 'Reason for consultation is required.';
//         }
//         if (!formData.preferredDate) {
//             isValid = false;
//             newErrors.preferredDate = 'Preferred date of consultation is required.';
//         }
//         if (!formData.preferredTime) {
//             isValid = false;
//             newErrors.preferredTime = 'Preferred time slot is required.';
//         }
//         if (!formData.preferredLanguage) {
//             isValid = false;
//             newErrors.preferredLanguage = 'Preferred language is required.';
//         }
//         if (!formData.visitedBefore) {
//             isValid = false;
//             newErrors.visitedBefore = 'Please indicate if you have visited us before.';
//         }
//         if (!formData.consent) {
//             isValid = false;
//             newErrors.consent = 'You must give your consent to proceed.';
//         }

//         setErrors(newErrors);
//         return isValid;
//     };

//     const onToken = async (token) => {
//         console.log('Payment Successful:', token);
//         const body = { token };

//         try {
//             const response = await fetch('http://localhost:3001/booking/payment', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(body),
//             });
//             console.log(response);
//         } catch (err) {
//             console.log(err);
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!validateForm()) return;

//         console.log('Form submitted:', formData);

//         try {
//             const response = await fetch('http://localhost:3001/consult/create', {
//                 method: 'POST',
                // headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify(formData),
            // });

//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }

//             const session = await response.json();
//             const stripe = await stripePromise;
// 
            // const result = stripe.redirectToCheckout({
//                 sessionId: session.id,
//             });

//             if (result.error) {
//                 console.error("Error:", result.error.message);
//             }
//         } catch (error) {
//             console.error('Fetch Error:', error);
//         }
//     };

//     return (
//         <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)' }}>
//             <div className="container">
//                 <form onSubmit={handleSubmit}>
//                     <h1 style={{ color: '#0e0737', fontWeight: 'bold', textAlign: 'center' }}>Book the Appointment</h1>

//                     <label>Full Name:</label>
//                     <input
//                         type="text"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleChange}
//                         style={errors.fullName ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.fullName && <div style={{ color: 'red' }}>{errors.fullName}</div>}

//                     <label>Date of Birth:</label>
//                     <input
//                         type="date"
//                         name="dob"
//                         value={formData.dob}
//                         onChange={handleChange}
//                         style={errors.dob ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.dob && <div style={{ color: 'red' }}>{errors.dob}</div>}

//                     <label>Gender:</label>
//                     <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         style={errors.gender ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                         <option value="other">Other</option>
//                     </select>
//                     {errors.gender && <div style={{ color: 'red' }}>{errors.gender}</div>}

//                     <label>Email Address:</label>
//                     <input
//                         type="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         style={errors.email ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.email && <div style={{ color: 'red' }}>{errors.email}</div>}

//                     <label>Phone Number:</label>
//                     <input
//                         type="text"
//                         name="phone"
//                         value={formData.phone}
//                         onChange={handleChange}
//                         style={errors.phone ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.phone && <div style={{ color: 'red' }}>{errors.phone}</div>}

//                     <label>Reason for Consultation:</label>
//                     <textarea
//                         name="consultationReason"
//                         value={formData.consultationReason}
//                         onChange={handleChange}
//                         style={errors.consultationReason ? { border: '1px solid red' } : {}}
//                     ></textarea>
//                     {errors.consultationReason && <div style={{ color: 'red' }}>{errors.consultationReason}</div>}

//                     <label>Preferred Date of Consultation:</label>
//                     <input
//                         type="date"
//                         name="preferredDate"
//                         value={formData.preferredDate}
//                         onChange={handleChange}
//                         style={errors.preferredDate ? { border: '1px solid red' } : {}}
//                     />
//                     {errors.preferredDate && <div style={{ color: 'red' }}>{errors.preferredDate}</div>}

//                     <label>Preferred Time Slot:</label>
//                     <select
//                         name="preferredTime"
//                         value={formData.preferredTime}
//                         onChange={handleChange}
//                         style={errors.preferredTime ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="morning">Morning (9 AM - 12 PM)</option>
//                         <option value="afternoon">Afternoon (1 PM - 4 PM)</option>
//                         <option value="evening">Evening (5 PM - 8 PM)</option>
//                     </select>
//                     {errors.preferredTime && <div style={{ color: 'red' }}>{errors.preferredTime}</div>}

//                     <label>Preferred Language for Consultation:</label>
//                     <select
//                         name="preferredLanguage"
//                         value={formData.preferredLanguage}
//                         onChange={handleChange}
//                         style={errors.preferredLanguage ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="English">English</option>
//                         <option value="Spanish">Spanish</option>
//                         <option value="Other">Other</option>
//                     </select>
//                     {errors.preferredLanguage && <div style={{ color: 'red' }}>{errors.preferredLanguage}</div>}

//                     <label>Have you visited our clinic before?</label>
//                     <select
//                         name="visitedBefore"
//                         value={formData.visitedBefore}
//                         onChange={handleChange}
//                         style={errors.visitedBefore ? { border: '1px solid red' } : {}}
//                     >
//                         <option value="">Select</option>
//                         <option value="yes">Yes</option>
//                         <option value="no">No</option>
//                     </select>
//                     {errors.visitedBefore && <div style={{ color: 'red' }}>{errors.visitedBefore}</div>}

//                     <label>
//                         <input
//                             type="checkbox"
//                             name="consent"
//                             checked={formData.consent}
//                             onChange={handleChange}
//                         />
//                         I consent to my data being used for the purpose of scheduling an online consultation.
//                     </label>
//                     {errors.consent && <div style={{ color: 'red' }}>{errors.consent}</div>}

//                     <StripeCheckout
//                         stripeKey="pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr"
//                         token={onToken}
//                         name={booking.name}
//                         amount={booking.price * 100} // Stripe expects the amount in cents
//                         currency="LKR" // or the currency of your choice
//                     />
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default BookingForm;
import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh');

function BookingForm() {
    const location = useLocation();
    const navigate = useNavigate();
    const { doctorName, availability, doctorId } = location.state || {};

    const [formData, setFormData] = useState({
        doctorName: doctorName || '',
        preferredDate: availability ? availability.day : '',
        preferredTime: availability ? availability.time : '',
        fullName: '',
        dob: '',
        gender: '',
        email: '',
        phone: '',
        consultationReason: '',
        preferredLanguage: '',
        visitedBefore: '',
        consent: false,
        doctorId: doctorId || ''
    });

    const [errors, setErrors] = useState({});
    const [booking, setBooking] = useState({
        name: "Booking for Doctor consultation",
        price: 1500
    });
    const [paymentProcessed, setPaymentProcessed] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const validateForm = () => {
        let newErrors = {};
        let isValid = true;

        if (!formData.fullName.trim()) {
            isValid = false;
            newErrors.fullName = 'Full name is required.';
        }
        if (!formData.dob) {
            isValid = false;
            newErrors.dob = 'Date of birth is required.';
        }
        if (!formData.gender) {
            isValid = false;
            newErrors.gender = 'Gender is required.';
        }
        if (!formData.email) {
            isValid = false;
            newErrors.email = 'Email address is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            isValid = false;
            newErrors.email = 'Email address is invalid.';
        }
        if (!formData.phone) {
            isValid = false;
            newErrors.phone = 'Phone number is required.';
        } else if (!/^\d{10}$/.test(formData.phone)) {
            isValid = false;
            newErrors.phone = 'Phone number must be 10 digits.';
        }
        if (!formData.consultationReason.trim()) {
            isValid = false;
            newErrors.consultationReason = 'Reason for consultation is required.';
        }
        if (!formData.preferredDate) {
            isValid = false;
            newErrors.preferredDate = 'Preferred date of consultation is required.';
        }
        if (!formData.preferredTime) {
            isValid = false;
            newErrors.preferredTime = 'Preferred time slot is required.';
        }
        if (!formData.preferredLanguage) {
            isValid = false;
            newErrors.preferredLanguage = 'Preferred language is required.';
        }
        if (!formData.visitedBefore) {
            isValid = false;
            newErrors.visitedBefore = 'Please indicate if you have visited us before.';
        }
        if (!formData.consent) {
            isValid = false;
            newErrors.consent = 'You must give your consent to proceed.';
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error('Please fill out all required fields before proceeding.', { position: 'bottom-right' });
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/consult/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                toast.success('Form submitted successfully! Please proceed with the payment.', { position: 'bottom-right' });
                setPaymentProcessed(true);
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            toast.error('Form submission failed. Please try again.', { position: 'bottom-right' });
            console.log(error);
        }
    };

    const handleToken = async (token) => {
        try {
          const response = await fetch('http://localhost:3001/booking/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, booking: formData })
          });
      
          if (response.ok) {
            const data = await response.json();
            toast.success('Payment Successful!', { position: 'bottom-right' });
      
            // After successful payment, add the booking to the doctor's dashboard
            const addToDashboardResponse = await fetch('http://localhost:3001/booking/payment/success', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ bookingId: data.bookingId, doctorId: data.doctorId })
            });
      
            if (addToDashboardResponse.ok) {
              toast.success('Booking added to doctor\'s dashboard!', { position: 'bottom-right' });
              navigate('/');
            } else {
              throw new Error('Failed to add booking to doctor\'s dashboard');
            }
          } else {
            throw new Error('Payment failed');
          }
        } catch (error) {
        //   toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
          console.error(error);
        }
      };

    return (
        <div className="container mt-5 mb-5">
            <ToastContainer />
            <h2 className="mb-4">Booking Form</h2>
            <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <label htmlFor="doctorName">Doctor's Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="doctorName"
                        name="doctorName"
                        value={formData.doctorName}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                    />
                    {errors.preferredDate && <small className="text-danger">{errors.preferredDate}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="preferredTime">Preferred Time</label>
                    <input
                        type="time"
                        className="form-control"
                        id="preferredTime"
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                    />
                    {errors.preferredTime && <small className="text-danger">{errors.preferredTime}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                    {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input
                        type="date"
                        className="form-control"
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                    {errors.dob && <small className="text-danger">{errors.dob}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    {errors.gender && <small className="text-danger">{errors.gender}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                        type="text"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                    {errors.phone && <small className="text-danger">{errors.phone}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="consultationReason">Reason for Consultation</label>
                    <textarea
                        className="form-control"
                        id="consultationReason"
                        name="consultationReason"
                        value={formData.consultationReason}
                        onChange={handleChange}
                    />
                    {errors.consultationReason && <small className="text-danger">{errors.consultationReason}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="preferredLanguage">Preferred Language</label>
                    <select
                        className="form-control"
                        id="preferredLanguage"
                        name="preferredLanguage"
                        value={formData.preferredLanguage}
                        onChange={handleChange}
                    >
                        <option value="">Select Language</option>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                        <option value="Other">Other</option>
                    </select>
                    {errors.preferredLanguage && <small className="text-danger">{errors.preferredLanguage}</small>}
                </div>
                <div className="form-group">
                    <label htmlFor="visitedBefore">Have you visited us before?</label>
                    <select
                        className="form-control"
                        id="visitedBefore"
                        name="visitedBefore"
                        value={formData.visitedBefore}
                        onChange={handleChange}
                    >
                        <option value="">Select an option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                    {errors.visitedBefore && <small className="text-danger">{errors.visitedBefore}</small>}
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="consent">I give my consent for data processing.</label>
                    {errors.consent && <small className="text-danger">{errors.consent}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {paymentProcessed && (
                <StripeCheckout
                    stripeKey="pk_test_51PGywdBwqNocB2yIgRUhTOxCLUXifycb47usxmBwsizanJt9hIuwOLGasezA5xeXFukFgxT4UPmcqTRPl8ekCh3M00GL7hsLNh"
                    token={handleToken}
                    name="Consultation Booking"
                    amount={booking.price * 100}
                >
                    <button className="btn btn-success mt-4">Confirm Payment</button>
                </StripeCheckout>
            )}
        </div>
    );
}

export default BookingForm;






// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckout from 'react-stripe-checkout';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr');

// const BookingForm = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { availability, doctorName } = location.state || {};
//   const [formData, setFormData] = useState({
//     fullName: '',
//     dob: '',
//     gender: '',
//     email: '',
//     phone: '',
//     consultationReason: '',
//     preferredDate: availability ? availability.day : '',
//     preferredTime: availability ? availability.time : '',
//     chronicConditions: '',
//     medications: '',
//     allergies: '',
//     preferredLanguage: '',
//     visitedBefore: '',
//     consent: false,
//     doctorName: doctorName || ''
//   });

//   const [errors, setErrors] = useState({});
//   const [booking, setBooking] = useState({
//     name: "Booking for Doctor consultation",
//     price: 1500
//   });
//   const [paymentProcessed, setPaymentProcessed] = useState(false);

 
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     let isValid = true;

//     if (!formData.fullName.trim()) {
//       isValid = false;
//       newErrors.fullName = 'Full name is required.';
//     }
//     if (!formData.dob) {
//       isValid = false;
//       newErrors.dob = 'Date of birth is required.';
//     }
//     if (!formData.gender) {
//       isValid = false;
//       newErrors.gender = 'Gender is required.';
//     }
//     if (!formData.email) {
//       isValid = false;
//       newErrors.email = 'Email address is required.';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       isValid = false;
//       newErrors.email = 'Email address is invalid.';
//     }
//     if (!formData.phone) {
//       isValid = false;
//       newErrors.phone = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       isValid = false;
//       newErrors.phone = 'Phone number is invalid.';
//     }
//     if (!formData.consultationReason.trim()) {
//       isValid = false;
//       newErrors.consultationReason = 'Reason for consultation is required.';
//     }
//     if (!formData.preferredDate) {
//       isValid = false;
//       newErrors.preferredDate = 'Preferred date is required.';
//     }
//     if (!formData.preferredTime) {
//       isValid = false;
//       newErrors.preferredTime = 'Preferred time is required.';
//     }
//     if (!formData.consent) {
//       isValid = false;
//       newErrors.consent = 'Consent is required.';
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     if (validateForm()) {
//       // Proceed with booking
//       try {
//         const response = await fetch('http://localhost:3001/bookings', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
//           },
//           body: JSON.stringify(formData)
//         });
  
//         if (response.ok) {
//           toast.success('Booking successful!', { position: 'bottom-right' });
//           // Redirect to payment page only if booking is successful and form is valid
//           navigate('/payment');
//         } else {
//           throw new Error('Booking failed');
//         }
//       } catch (error) {
//         console.error('Error booking appointment:', error);
//         toast.error('Booking failed. Please try again.', { position: 'bottom-right' });
//       }
//     } else {
//       toast.error('Please fill in all the required fields.', { position: 'bottom-right' });
//     }
//   };

//   const handleToken = async (token) => {
//     try {
//       const response = await fetch('http://localhost:3001/charge', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           token,
//           booking
//         })
//       });

//       if (response.ok) {
//         setPaymentProcessed(true);
//         toast.success('Payment successful!', { position: 'bottom-right' });
//       } else {
//         throw new Error('Payment failed');
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//       toast.error('Payment failed. Please try again.', { position: 'bottom-right' });
//     }
//   };

//   return (
//     <div style={{ background: 'linear-gradient(to bottom, #FFFCFC, #AB9551)', padding: '60px' }} >
//     <div className="booking-form-container">
//     <h1 style={{ color: '#0e0737', fontWeight: 'bold', textAlign: 'center' }}>Book the Appointment</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Doctor's Name</label>
//           <input type="text" name="doctorName" value={formData.doctorName} readOnly className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Full Name</label>
//           <input type="text" name="fullName" value={formData.fullName} readOnly className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Date of Birth</label>
//           <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-control" />
//           {errors.dob && <small className="form-text text-danger">{errors.dob}</small>}
//         </div>
//         <div className="form-group">
//           <label>Gender</label>
//           <select name="gender" value={formData.gender} onChange={handleChange} className="form-control">
//             <option value="">Select Gender</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <small className="form-text text-danger">{errors.gender}</small>}
//         </div>
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} readOnly className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Phone Number</label>
//           <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
//           {errors.phone && <small className="form-text text-danger">{errors.phone}</small>}
//         </div>
//         <div className="form-group">
//           <label>Reason for Consultation</label>
//           <textarea name="consultationReason" value={formData.consultationReason} onChange={handleChange} className="form-control"></textarea>
//           {errors.consultationReason && <small className="form-text text-danger">{errors.consultationReason}</small>}
//         </div>
//         <div className="form-group">
//           <label>Preferred Date</label>
//           <input type="text" name="preferredDate" value={formData.preferredDate} readOnly className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Preferred Time</label>
//           <input type="text" name="preferredTime" value={formData.preferredTime} readOnly className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Chronic Conditions</label>
//           <textarea name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} className="form-control"></textarea>
//         </div>
//         <div className="form-group">
//           <label>Medications</label>
//           <textarea name="medications" value={formData.medications} onChange={handleChange} className="form-control"></textarea>
//         </div>
//         <div className="form-group">
//           <label>Allergies</label>
//           <textarea name="allergies" value={formData.allergies} onChange={handleChange} className="form-control"></textarea>
//         </div>
//         <div className="form-group">
//           <label>Preferred Language</label>
//           <input type="text" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>Have you visited this doctor before?</label>
//           <input type="text" name="visitedBefore" value={formData.visitedBefore} onChange={handleChange} className="form-control" />
//         </div>
//         <div className="form-group">
//           <label>
//             <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="form-check-input" />
//             I give my consent for the consultation
//           </label>
//           {errors.consent && <small className="form-text text-danger">{errors.consent}</small>}
//         </div>
//         {/* <button type="submit" >Submit</button> */}
//         <StripeCheckout
//           stripeKey="pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr"
//           token={handleToken}
//           name="Book Appointment"
//           amount={booking.price * 100}
//         ><button type="submit" >Submit</button></StripeCheckout>
//         <ToastContainer />
//       </form>
//     </div>
//     </div>
//   );
// };

// export default BookingForm;



// import React, { useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js';
// import StripeCheckout from 'react-stripe-checkout';

// const stripePromise = loadStripe('pk_test_51PGywdBwqNocB2yIpZysEHjwSRQtGyTy7CT7hALvMgHDH7LvJsNQtupXJlqMi9oSaxWtHpERUxoacfQkEox0jpGI00jFplb4rr');

// const BookingForm = () => {
//   const { state } = useLocation();
//   const { availability, doctorName } = state;
//   const [formData, setFormData] = useState({
//     fullName: '',
//     dob: '',
//     gender: '',
//     email: '',
//     phone: '',
//     consultationReason: '',
//     chronicConditions: '',
//     medications: '',
//     allergies: '',
//     preferredLanguage: '',
//     visitedBefore: '',
//     consent: false,
//     preferredDate: availability.day,
//     preferredTime: availability.time,
//   });

//   const [errors, setErrors] = useState({});
//   const [booking, setBooking] = useState({
//     name: `Consultation with ${doctorName}`,
//     price: 1500,
//   });
//   const [paymentProcessed, setPaymentProcessed] = useState(false);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value,
//     }));
//   };

//   const validateForm = () => {
//     let newErrors = {};
//     let isValid = true;

//     if (!formData.fullName.trim()) {
//       isValid = false;
//       newErrors.fullName = 'Full name is required.';
//     }
//     if (!formData.dob) {
//       isValid = false;
//       newErrors.dob = 'Date of birth is required.';
//     }
//     if (!formData.gender) {
//       isValid = false;
//       newErrors.gender = 'Gender is required.';
//     }
//     if (!formData.email) {
//       isValid = false;
//       newErrors.email = 'Email address is required.';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       isValid = false;
//       newErrors.email = 'Email address is invalid.';
//     }
//     if (!formData.phone) {
//       isValid = false;
//       newErrors.phone = 'Phone number is required.';
//     } else if (!/^\d{10}$/.test(formData.phone)) {
//       isValid = false;
//       newErrors.phone = 'Phone number must be 10 digits.';
//     }
//     if (!formData.consultationReason.trim()) {
//       isValid = false;
//       newErrors.consultationReason = 'Reason for consultation is required.';
//     }
//     if (!formData.consent) {
//       isValid = false;
//       newErrors.consent = 'You must give consent to proceed.';
//     }

//     setErrors(newErrors);
//     return isValid;
//   };

//   const handleToken = async (token) => {
//     try {
//       const response = await fetch('http://localhost:3001/bookings/payment', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           token,
//           booking,
//         }),
//       });

//       if (response.ok) {
//         console.log('Payment processed successfully');
//         handleSubmitForm();
//       } else {
//         console.error('Payment failed');
//       }
//     } catch (error) {
//       console.error('Error processing payment:', error);
//     }
//   };

//   const handleSubmitForm = () => {
//     if (!validateForm()) {
//       return;
//     }

//     fetch('http://localhost:3001/bookings/add', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData),
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Failed to book appointment.');
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log('Appointment booked successfully:', data);
//         alert('Appointment booked successfully!');
//       })
//       .catch(error => {
//         console.error('Error booking appointment:', error);
//         alert('Failed to book appointment. Please try again.');
//       });
//   };

//   return (
//     <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
//       <h2>Book Appointment</h2>
//       <form>
//         <div>
//           <label>Full Name:</label>
//           <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
//           {errors.fullName && <span style={{ color: 'red' }}>{errors.fullName}</span>}
//         </div>
//         <div>
//           <label>Date of Birth:</label>
//           <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//           {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
//         </div>
//         <div>
//           <label>Gender:</label>
//           <select name="gender" value={formData.gender} onChange={handleChange}>
//             <option value="">Select...</option>
//             <option value="male">Male</option>
//             <option value="female">Female</option>
//             <option value="other">Other</option>
//           </select>
//           {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} />
//           {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
//         </div>
//         <div>
//           <label>Phone:</label>
//           <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
//           {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
//         </div>
//         <div>
//           <label>Reason for Consultation:</label>
//           <textarea name="consultationReason" value={formData.consultationReason} onChange={handleChange}></textarea>
//           {errors.consultationReason && <span style={{ color: 'red' }}>{errors.consultationReason}</span>}
//         </div>
//         <div>
//           <label>Chronic Conditions:</label>
//           <textarea name="chronicConditions" value={formData.chronicConditions} onChange={handleChange}></textarea>
//         </div>
//         <div>
//           <label>Medications:</label>
//           <textarea name="medications" value={formData.medications} onChange={handleChange}></textarea>
//         </div>
//         <div>
//           <label>Allergies:</label>
//           <textarea name="allergies" value={formData.allergies} onChange={handleChange}></textarea>
//         </div>
//         <div>
//           <label>Preferred Language:</label>
//           <input type="text" name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Have you visited us before?</label>
//           <select name="visitedBefore" value={formData.visitedBefore} onChange={handleChange}>
//             <option value="">Select...</option>
//             <option value="yes">Yes</option>
//             <option value="no">No</option>
//           </select>
//         </div>
//         <div>
//           <label>
//             <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
//             I consent to the terms and conditions
//           </label>
//           {errors.consent && <span style={{ color: 'red' }}>{errors.consent}</span>}
//         </div>
//         <div>
//           <StripeCheckout
//             stripeKey={stripePromise}
//             token={handleToken}
//             name={booking.name}
//             amount={booking.price * 100}
//             currency="USD"
//           />
//         </div>
//       </form>
//     </div>
//   );
// };

// export default BookingForm;

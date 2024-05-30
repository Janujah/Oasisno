// import React, { useState } from 'react';
// import { useParams } from 'react-router-dom';
// import Nav from '../Components/navbar';

// const OrderForm = () => {
//   const { productId } = useParams();
//   const [customerName, setCustomerName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [orderStatus, setOrderStatus] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:3001/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           productId,
//           customerName,
//           address,
//           phoneNumber,
//         }),
//       });
//       if (response.ok) {
//         setOrderStatus('Order placed successfully!');
//       } else {
//         setOrderStatus('Failed to place order.');
//       }
//     } catch (error) {
//       console.error('Error placing order:', error);
//       setOrderStatus('Failed to place order.');
//     }
//   };

//   return (
//     <div>
//       <Nav />
//       <div style={{ textAlign: 'center', marginTop: '20px' }}>
//         <h2>Order Form</h2>
//         <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
//           <div style={{ marginBottom: '10px' }}>
//             <label>Customer Name:</label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               required
//               style={{ padding: '10px', width: '100%', marginTop: '5px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label>Address:</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               required
//               style={{ padding: '10px', width: '100%', marginTop: '5px' }}
//             />
//           </div>
//           <div style={{ marginBottom: '10px' }}>
//             <label>Phone Number:</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               required
//               style={{ padding: '10px', width: '100%', marginTop: '5px' }}
//             />
//           </div>
//           <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Place Order</button>
//         </form>
//         {orderStatus && <p style={{ marginTop: '20px' }}>{orderStatus}</p>}
//       </div>
//     </div>
//   );
// };

// export default OrderForm;



import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import Nav from '../Components/navbar';

const OrderForm = () => {
  const { productId } = useParams();
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState('');

  useEffect(() => {
    // Assuming the token is stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCustomerName(decodedToken.name); // Adjust based on your token structure
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          customerName,
          address,
          phoneNumber,
        }),
      });
      if (response.ok) {
        setOrderStatus('Order placed successfully!');
      } else {
        setOrderStatus('Failed to place order.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      setOrderStatus('Failed to place order.');
    }
  };

  return (
    <div>
      <Nav />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <h2>Order Form</h2>
        <form onSubmit={handleSubmit} style={{ display: 'inline-block', textAlign: 'left' }}>
          <div style={{ marginBottom: '10px' }}>
            <label>Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              style={{ padding: '10px', width: '100%', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={{ padding: '10px', width: '100%', marginTop: '5px' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label>Phone Number:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              style={{ padding: '10px', width: '100%', marginTop: '5px' }}
            />
          </div>
          <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>Place Order</button>
        </form>
        {orderStatus && <p style={{ marginTop: '20px' }}>{orderStatus}</p>}
      </div>
    </div>
  );
};

export default OrderForm;

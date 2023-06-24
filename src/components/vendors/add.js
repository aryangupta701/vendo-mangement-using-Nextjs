import axios from 'axios';
import { useState } from 'react';
import styles from './add.module.css'

function AddVendor({ email, setFlag}) {
    const [vendorData, setVendorData] = useState({
      vendorName: '',
      bankAccountNo: '',
      bankName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      country: '',
      zipCode: '',
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setVendorData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleAddVendor = async(e) => {
      e.preventDefault();
      setVendorData({
        vendorName: '',
        bankAccountNo: '',
        bankName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        country: '',
        zipCode: '',
      });
      const requestBody = {
        email, 
        vendor: vendorData
      }
      await axios.post('http://localhost:3000/api/addVendor', requestBody);
      setFlag(prev => !prev); 
    };
  
    return (
      <div className={styles.addVendor}>
      <h2>Add Vendor</h2>
      <form onSubmit={handleAddVendor}>
        <label>
          Vendor Name:
          <input
            type="text"
            name="vendorName"
            value={vendorData.vendorName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bank Account No:
          <input
            type="text"
            name="bankAccountNo"
            value={vendorData.bankAccountNo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Bank Name:
          <input
            type="text"
            name="bankName"
            value={vendorData.bankName}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={vendorData.addressLine1}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={vendorData.addressLine2}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            name="city"
            value={vendorData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={vendorData.country}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Zip Code:
          <input
            type="text"
            name="zipCode"
            value={vendorData.zipCode}
            onChange={handleInputChange}
          />
        </label>
        <button className={styles.addVendorBtn} type="submit">Add Vendor</button>
      </form>
    </div>
    );
  }
  
  export default AddVendor; 
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
      <form onSubmit={handleAddVendor} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="vendorName">Vendor Name:</label>
          <input
            type="text"
            id="vendorName"
            name="vendorName"
            value={vendorData.vendorName}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bankAccountNo">Bank Account No:</label>
          <input
            type="text"
            id="bankAccountNo"
            name="bankAccountNo"
            value={vendorData.bankAccountNo}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bankName">Bank Name:</label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            value={vendorData.bankName}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="addressLine1">Address Line 1:</label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={vendorData.addressLine1}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="addressLine2">Address Line 2:</label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={vendorData.addressLine2}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={vendorData.city}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            name="country"
            value={vendorData.country}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={vendorData.zipCode}
            onChange={handleInputChange}
            className={styles.inputField}
          />
        </div>
        <button className={styles.addVendorBtn} type="submit">Add Vendor</button>
      </form>
    </div>
    );
  }
  
  export default AddVendor; 
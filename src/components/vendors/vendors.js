import axios from 'axios';
import { useState } from 'react';
import styles from './vendors.module.css'

function Vendors({ vendors, email, setFlag }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editVendor, setEditVendor]  = useState(null); 
  const itemsPerPage = 5; 
  const indexOfLastVendor = currentPage * itemsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - itemsPerPage;
  const currentVendors = vendors.slice(indexOfFirstVendor, indexOfLastVendor);
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
    console.log(vendorData); 
  };

  const handleUpdate = async(e) => {
    e.preventDefault();
    const requestBody = {
      email, 
      vendor: {
        vendorId : editVendor,
        ...vendorData
      }
    }
    console.log(requestBody); 
    setEditVendor(null); 
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
    await axios.post(`/api/updateVendor`, requestBody);
    setFlag(prev => !prev); 
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (vendorId) => {
    // Implement your delete logic here
    await axios.post('/api/deleteVendor', {vendorId, email}); 
    setFlag(prev => !prev); 
  };

  // Handle vendor editing
  const handleEdit = (vendor) => {
    // Implement your edit logic here
    setEditVendor(vendor.vendorId); 
  
    setVendorData({
      vendorName: vendor.vendorName,
      bankAccountNo: vendor.bankAccountNo,
      bankName: vendor.bankName,
      addressLine1: vendor.addressLine1,
      addressLine2: vendor.addressLine2,
      city: vendor.city,
      country: vendor.country, 
      zipCode: vendor.zipCode,
    });
  };

  return (
    <div className={styles.vendors}>
      <h2>Vendors</h2>
      {currentVendors.length === 0 && <p>No Vendors Added</p>}
      {currentVendors.map((vendor) => (
        <div className={styles.vendor} key={vendor.vendorId}>
          {editVendor && editVendor === vendor.vendorId ? (
            <form className={styles.editForm} onSubmit={handleUpdate}>
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
              <button type="submit" className={styles.saveButton}>Save</button>
            </form>
          ) : (
            <div className={styles.vendorDetails}>
              <p><strong>Vendor Name:</strong> {vendor.vendorName}</p>
              <p><strong>Bank Account No:</strong> {vendor.bankAccountNo}</p>
              <p><strong>Bank Name:</strong> {vendor.bankName}</p>
              <p><strong>Address:</strong> {vendor.addressLine1}</p>
              <p><strong>City:</strong> {vendor.city}</p>
              <p><strong>Country:</strong> {vendor.country}</p>
              <p><strong>Zip Code:</strong> {vendor.zipCode}</p>
              <button onClick={() => handleDelete(vendor.vendorId)} className={styles.deleteButton}>Delete</button>
              <button onClick={() => handleEdit(vendor)} className={styles.editButton}>Edit</button>
            </div>
          )}
        </div>
      ))}

      {/* Pagination */}
      {vendors.length > itemsPerPage && (
        <div className={styles.pagination}>
          <ul className={styles.pageList}>
            {Array(Math.ceil(vendors.length / itemsPerPage))
              .fill()
              .map((_, index) => (
                <li key={index} className={styles.pageItem}>
                  <button onClick={() => handlePageChange(index + 1)} className={styles.pageButton}>{index + 1}</button>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Vendors;

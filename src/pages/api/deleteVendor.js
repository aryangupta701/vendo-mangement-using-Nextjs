import { db} from '../../helpers/api/db';
import { apiHandler} from '../../helpers/api/apiHandler';

export default apiHandler({
    post: deleteVendor,
  });

async function deleteVendor(req, res) {
    const vendorId = req.body.vendorId;
  
    try {
      const user = await db.User.findOne({ email: req.body.email });
  
      if (user) {
        const vendorIndex = user.vendors.findIndex((vendor) => vendor.vendorId === vendorId);
  
        if (vendorIndex !== -1) {
          user.vendors.splice(vendorIndex, 1);
          const savedUser = await user.save();
          res.status(200).json(savedUser);
        } else {
          res.status(404).json({ error: 'Vendor not found' });
        }
      } else {
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
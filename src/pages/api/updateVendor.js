import { db} from '../../helpers/api/db';
import { apiHandler} from '../../helpers/api/apiHandler';

export default apiHandler({
    post: update
});

async function update(req, res) {
    const email = req.body.email;
    const vendor = req.body.vendor; 
  
    try {
      let user = await db.User.findOne({ email });
  
      if (user) {
        // Find the vendor with the matching vendorId and update its data
        const vendorIndex = user.vendors.findIndex((v) => v.vendorId === vendor.vendorId);
        if (vendorIndex !== -1) {
          user.vendors[vendorIndex] = vendor;
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
  
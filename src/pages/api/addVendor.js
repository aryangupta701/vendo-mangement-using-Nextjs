import { db} from '../../helpers/api/db';
import { apiHandler} from '../../helpers/api/apiHandler';
import { v4 as uuidv4 } from 'uuid';


export default apiHandler({
    post: add
});

async function add(req, res) {
    const email = req.body.email;
    const vendor = {
      vendorId: uuidv4(),
        ...req.body.vendor
    }
    console.log(vendor); 
    try {
      let user = await db.User.findOne({ email });
  
      if (user) {
        // User exists, push new vendor to the vendors array
        user.vendors.push(vendor);
        const savedUser = await user.save();
        res.status(200).json(savedUser);
      } 
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
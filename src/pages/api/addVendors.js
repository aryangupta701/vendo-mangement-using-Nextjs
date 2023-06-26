import { db} from '../../helpers/api/db';
import { apiHandler} from '../../helpers/api/apiHandler';
import { v4 as uuidv4 } from 'uuid';


export default apiHandler({
    post: add
});

async function add(req, res) {
    const email = req.body.email; 
    try {
      let user = await db.User.findOne({ email });
      
  
      if (user) {
        for(let i=0; i<100; i++) {
            const vendor = {
                vendorId : uuidv4(),
                vendorName: `TempName ${i}`,
                bankAccountNo: i*9088213890,
                bankName: `TempBank ${i}`,
                addressLine1: `address line 1 ${i}`,
                addressLine2: `address line 1 ${i}`,
                city: `TempCity ${i}`,
                country: `TempCountry ${i}`,
                zipCode: i*102308
            }
            user.vendors.push(vendor);
        }
        const savedUser = await user.save();
        res.status(200).json(savedUser);
      } 
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
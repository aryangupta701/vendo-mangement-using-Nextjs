import { db} from '../../helpers/api/db';
import { apiHandler} from '../../helpers/api/apiHandler';


export default apiHandler({
    post: getUserData
});

async function getUserData(req, res) {
    const email = req.body.email;
  
    try {
      let user = await db.User.findOne({ email });
  
      if (user) {
        // User already exists, return user data
        res.status(200).json(user);
      } else {
        // User does not exist, create new user
        const newUser = new db.User({
          name: req.body.name,
          email: req.body.email,
          image : req.body.image, 
          vendors: []
        });
  
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
}
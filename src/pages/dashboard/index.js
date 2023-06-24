import axios from 'axios';
import { getSession, signOut } from 'next-auth/react';
import Vendors from '../../components/vendors/vendors'
import AddVendor from '../../components/vendors/add'
import {  useEffect, useState } from 'react';

function Dashboard({ user }) {
  const [state, setState] = useState(true); 
  const [userData, setUserData] = useState({})
  const handleLogout = () => {
    signOut();
  };

  useEffect(async()=>{
    const data = await getUserData(user); 
    setUserData(data); 
  }, [state])

  const vendors = userData.vendors || []

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <img src={userData.image}></img>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
      <button onClick={handleLogout}>Logout</button>
      <AddVendor email={userData.email} setState={setState}/>
      <Vendors vendors={vendors} email={userData.email} setState={setState}/> 
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return {
    props: {user: session.user},
  };
}

async function getUserData(user) {
  const requestBody = {
    ...user
  };
  
  try {
    const response = await axios.post('http://localhost:3000/api/user', requestBody);
    const userData = response.data;
    return userData; 
  } catch (error) {
    console.error(error.message);
  }
}

export default Dashboard;

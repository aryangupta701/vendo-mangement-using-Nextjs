import { getSession, signOut } from 'next-auth/react';

function Dashboard() {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
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
  const user = session.user; 
  
  return {
    props: {},
  };
}

export default Dashboard;

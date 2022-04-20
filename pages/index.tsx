import type { NextPage } from 'next';
import { getSession, signOut, useSession } from 'next-auth/react';
import styles from '../styles/Home.module.css';
// import useRequireAuth from '../lib/useRequiseAuth';

// export async function getServerSideProps(context) {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/login',
//       },
//     };
//   }

//   return {
//     props: {
//       session,
//     },
//   };
// }

const Home: NextPage = () => {
  const { data: session } = useSession();

  // const session = useRequireAuth();
  // if (!session) return <div>loading...</div>;

  return (
    <div className={styles.container}>
      <h1>{`Seja bem-vindo ${session?.user?.name}`}</h1>
      <button onClick={() => signOut()}>Sair</button>
    </div>
  );
};

export default Home;

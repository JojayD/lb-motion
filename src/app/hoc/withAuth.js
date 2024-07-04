import { getSession } from "next-auth/react";

export default function withAuth(Component) {
  return function AuthenticatedComponent(props) {
    return <Component {...props} />;
  };
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

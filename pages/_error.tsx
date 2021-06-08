import NextError, { ErrorProps } from "next/error";
import Error404 from "./404";

const ErrorPage = ({
  statusCode,
  hasGetInitialPropsRun = false,
  err = "",
}: {
  statusCode: number;
  hasGetInitialPropsRun?: boolean;
  err?: string;
}): JSX.Element => {
  switch (statusCode) {
    case 404:
      return <Error404 />;
    default:
      return <NextError statusCode={statusCode} />;
  }
};

ErrorPage.getInitialProps = async ({
  res,
  err,
  asPath,
  pathname,
  query,
  AppTree,
}): Promise<ErrorProps> => {
  const errorInitialProps = (await NextError.getInitialProps({
    AppTree,
    err,
    pathname,
    query,
    res,
  })) as any;

  // Workaround for https://github.com/zeit/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  // Running on the server, the response object (`res`) is available.
  //
  // Next.js will pass an err on the server if a page's data fetching methods
  // threw or returned a Promise that rejected
  //
  // Running on the client (browser), Next.js will provide an err if:
  //
  //  - a page's `getInitialProps` threw or returned a Promise that rejected
  //  - an exception was thrown somewhere in the React lifecycle (render,
  //    componentDidMount, etc) that was caught by Next.js's React Error
  //    Boundary. Read more about what types of exceptions are caught by Error
  //    Boundaries: https://reactjs.org/docs/error-boundaries.html

  if (res?.statusCode === 404) {
    // Opinionated: do not record an exception in Sentry for 404
    return { statusCode: 404 };
  }

  return errorInitialProps;
};

export default ErrorPage;

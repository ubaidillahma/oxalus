import config from "../../../config";

const LaoderLayoutApp = async ({ request, params }: any) => {
  if (window.localStorage.getItem("login-web") !== null) {
    const authUser = JSON.parse(
      window.localStorage.getItem("login-web") as string
    );
    const getInfo = await fetch(`${config.API_URL}member/info`, {
      method: "GET",
      headers: new Headers({
        "Content-type": "application/json",
        "x-api-key": config.API_KEY,
        AUTHORIZATION: "Bearer " + authUser?.token,
      }),
    });

    if (getInfo.status === 200) {
      const responseInfo = await getInfo.json();
      return { auth: true, users: responseInfo };
    }

    if (getInfo.status >= 400) {
      const responseError = await getInfo.json();
      return { auth: false, users: responseError };
    }
  }
  return { auth: false, users: null };
};

const LoaderPaymentItruction = ({ request, params }: any) => {
  return { params: params, req: request };
};

export { LaoderLayoutApp, LoaderPaymentItruction };

export const getApiConfig = () => {
  const baseURL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://frontendcodingtest-production.up.railway.app";

  return {
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
};

import { type Api } from "~~/src/type/api";

export async function useMyFetch<T>(url: string, op: Api) {
  const runtimeConfig = useRuntimeConfig();

  return await useFetch<T>(url, {
    immediate: op.immediate === false ? false : true,
    deep: op.deep === false ? false : true,
    watch: op.watch ? op.watch : [],
    onRequest({ request, options }) {
      options.initialCache = false;
      options.baseURL = runtimeConfig.public.API_BASE_URL as string;
      options.method = op.method || "get";

      if (op.body) {
        options.body = op.body;
      }
    },
    onRequestError({ request, options, error }) {
      // if (runtimeConfig.public.IS_DEV) {
      //   // console.error(" On Request Error ");
      //   // console.error(error, options, request);
      // }
    },
    onResponse({ request, response, options }) {
      // if (runtimeConfig.public.IS_DEV) {
      //   // console.info(" On Response ");
      //   // console.info(response._data);
      // }
      return response._data;
    },
    onResponseError({ request, response, options }) {
      // if (runtimeConfig.public.IS_DEV) {
      //   // console.info(" On Response Error");
      //   // console.info(response._data);
      // }

      const error: Error = response._data;
      // errorMsg(error.message);
      return response._data;
    },
  });
}

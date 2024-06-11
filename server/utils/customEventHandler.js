import { withQuery, getQuery } from "ufo";
export default function MyEventHandler(config, proxyPath, targetPath) {
  return defineEventHandler((event) => {
    try {
      let target = `${config.public.MCI_TEST_API}${targetPath}`;
      target = event.path.replace(proxyPath, target)
      if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target);
    } catch (error) {
      console.log(error);
    }
  })
}
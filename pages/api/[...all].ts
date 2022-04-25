import { NextApiRequest, NextApiResponse} from "next";
import httpProxyMiddleware from 'next-http-proxy-middleware';

const proxy =  (req: NextApiRequest, res: NextApiResponse) => httpProxyMiddleware(req, res, {
    // You can use the `http-proxy` option
    target:'https://adventuresy-apis.azurewebsites.net',
});

export default proxy;
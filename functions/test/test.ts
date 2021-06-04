import { Handler } from "@netlify/functions";
import { getBody } from "./helper";

const handler: Handler = async (event, context) => {
  return {
    statusCode: 200,
    body: getBody(),
  };
};

export { handler };

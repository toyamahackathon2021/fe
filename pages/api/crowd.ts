import { NextApiRequest, NextApiResponse } from "next";
import g01 from "./crowd_data/g01.json";
// import g01 from  "./goal_1.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");  
  console.log("===================/api/crowd=222=======================");
  console.log(g01)
  res.end(JSON.stringify(g01));
}

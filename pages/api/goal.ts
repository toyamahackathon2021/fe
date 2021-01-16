import { NextApiRequest, NextApiResponse } from "next";
import goal_1 from "./goal_1.json";
// import goal_2 from "./goal_2.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const id = query["id"];

  const all = [
    {
      id: "1",
      data: goal_1,
    },
    {
      id: "2",
      // data: goal_2,
    },
    {
      id: "3",
      // data: goal_3,
    },
  ];

  const data = id === undefined ? all : all.filter((d) => d.id === id);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

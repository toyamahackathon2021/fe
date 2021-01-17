import { NextApiRequest, NextApiResponse } from "next";
import goal_1 from "./crowd_data/g01.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const query = req.query;
  const id = query["id"];

  const all = [
    {
      id: "1",
      data: goal_1,
    },
  ];

  const data = id === undefined ? all : all.filter((d) => d.id === id);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

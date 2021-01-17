import { NextApiRequest, NextApiResponse } from "next";
import g01 from "./crowd_data/g01.json";
// import g01 from  "./goal_1.json";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");  

  const nearestDateForCSVField = (dt) => {
    const y = dt.getFullYear();
    const m = ('00' + (dt.getMonth()+1)).slice(-2);
    const d = ('00' + dt.getDate()).slice(-2);
    const h = ('00' + dt.getHours()).slice(-2);
    const mm = (Math.floor(dt.getMinutes() / 10) * 10);
    // return (y + '-' + m + '-' + d + " " + h + ":" + mm + ":00");
    return ("2020-12-06 " + h + ":" + mm + ":00");
  }

  const formattedDateForCSVField = nearestDateForCSVField(new Date());
  // 雑に書いておく
  console.log(formattedDateForCSVField);

  let matchedData = { "level": 0 };
  for (const [key, value] of Object.entries(g01)) {
    // console.log(`${key}: ${value}`);
    if (value.datetime == formattedDateForCSVField ) {
      matchedData = { "level": value.level };
      console.log("matched!!!");
      console.log(matchedData);
    }
  }

  res.end(JSON.stringify(matchedData));
}

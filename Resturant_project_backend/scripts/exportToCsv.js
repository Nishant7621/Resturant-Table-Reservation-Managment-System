import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

function toCsv(rows) {
  if (!rows || !rows.length) return "";
  const headers = Object.keys(rows[0]);
  const lines = [headers.join(",")];
  for (const row of rows) {
    const values = headers.map((h) => {
      let val = row[h] === null || row[h] === undefined ? "" : String(row[h]);
      if (Array.isArray(row[h])) val = row[h].join("; ");
      val = val.replaceAll('"', '""');
      return `"${val}"`;
    });
    lines.push(values.join(","));
  }
  return lines.join("\n");
}

async function exportAll() {
  const { data: restaurants } = await supabase.from("restaurant_details").select("*");
  const { data: customers } = await supabase.from("customer").select("id, name, email, phone, role, created_at");
  const { data: reservations } = await supabase.from("reservations").select("*");

  fs.writeFileSync("../Google_Sheet_Restaurants.csv", toCsv(restaurants));
  fs.writeFileSync("../Google_Sheet_Customers.csv", toCsv(customers));
  fs.writeFileSync("../Google_Sheet_Reservations.csv", toCsv(reservations));
  console.log("CSVs generated successfully!");
}

exportAll();

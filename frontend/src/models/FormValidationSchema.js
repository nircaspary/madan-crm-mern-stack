import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const regex = {
  email: /^(?!.*\.\.)[\w.\-#!$%&'*+\/=?^_`{}|~]{1,35}@[\w.\-]+\.[a-zA-Z]{2,15}$/,
  cellPhone: /^0[2-9]\d{7,8}$/,
};

const schema = z.object({
  id: z.string().max(9).min(9, { message: "Must be 9 characters long" }),
  firstName: z.string().min(2, { message: "Please enter a valid name" }),
  lastName: z.string().min(2, { message: "Please enter a valid name" }),
  email: z
    .string()
    .regex(regex.email, { message: "Please enter a valid email" }),
  cellPhone: z
    .string()
    .length(10, { message: "Must be 10 characters long" })
    .regex(regex.cellPhone, { message: "Please enter a valid phone number" }),
  officePhone: z.string().length(7, { message: "Must be 7 characters long" }),
  faultLocation: z.string(),
  computerName: z.string().length(5, { message: "Must be 5 digit number" }),
  description: z.string().min(1).max(4000),
});

export default schema;

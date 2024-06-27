"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Payment = {
  name: string;
  status: string;
  email: string;
  amount: number;
  datecreated: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "datecreated",
    header: "Date Created",
  },
];

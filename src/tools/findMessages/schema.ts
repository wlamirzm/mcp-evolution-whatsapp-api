import { z } from "zod";

export const findMessagesSchema = z.object({
  instanceName: z.string().describe("The name of the instance to find messages for"),
  page: z.number().optional().default(1).describe("The page number to fetch"),
  recordsPerPage: z.number().optional().default(20).describe("Number of records per page"),
  remoteJid: z.string().optional().describe("Filter by remote JID (e.g. 551199999999@s.whatsapp.net)"),
});

export type FindMessagesSchema = z.infer<typeof findMessagesSchema>;

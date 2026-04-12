import type { ToolRegistration } from "@/types";
import { makeJsonSchema } from "@/utils/makeJsonSchema";
import { evolutionApi } from "@/utils/evolutionApi";
import { type FindMessagesSchema, findMessagesSchema } from "./schema";

export const findMessages = async (
  args: FindMessagesSchema,
) => {
  try {
    const params = {
      page: args.page,
      recordsPerPage: args.recordsPerPage,
      where: args.remoteJid ? { remoteJid: args.remoteJid } : undefined
    };
    const result = await evolutionApi.findMessages(args.instanceName, params);
    return result;
  } catch (error) {
    console.error("Error in findMessages:", error);
    throw new Error(`Failed to find messages: ${(error as Error).message}`);
  }
};

export const findMessagesTool: ToolRegistration<FindMessagesSchema> = {
  name: "find_messages",
  description: "Find messages for a specific instance with optional filtering and pagination",
  inputSchema: makeJsonSchema(findMessagesSchema),
  handler: async (args: FindMessagesSchema) => {
    try {
      const parsedArgs = findMessagesSchema.parse(args);
      const result = await findMessages(parsedArgs);
      
      const count = result.messages.records.length;
      const total = result.messages.total;
      const resultJson = JSON.stringify(result.messages.records, null, 2);
      
      return {
        content: [
          {
            type: "text",
            text: `Found ${count} messages (Total: ${total}) for instance "${parsedArgs.instanceName}":\n\n${resultJson}`,
          },
        ],
      };
    } catch (error) {
      console.error("Error in findMessagesTool handler:", error);
      return {
        content: [
          {
            type: "text",
            text: `Error: ${(error as Error).message}`,
          },
        ],
        isError: true,
      };
    }
  },
};

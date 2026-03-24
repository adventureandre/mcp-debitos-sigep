import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mcp-debitos-sigep",
  version: "1.0.0",
});

const API_BASE_URL = process.env.API_DEBITOS_SIGEP_URL || "http://localhost:3333";

// ========================================
// Tool: Buscar Debitos pelo CNPJ
// ========================================

server.tool(
  "findDebit",
  "Buscar Debitos pelo CNPJ",
  {
    cnpj: z.string().describe("CNPJ para buscar débitos (somente números)"),
    page: z.number().optional().default(1).describe("Número da página"),
    limit: z.number().optional().default(10).describe("Quantidade de registros por página"),
  },
  async ({ cnpj, page, limit }) => {
    try {
      const url = `${API_BASE_URL}/debitos/cnpj/${cnpj}?page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, status: response.status, error: errorText }, null, 2) }],
        };
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify({ success: true, ...data }, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: error.message }, null, 2) }],
      };
    }
  }
);

// ========================================
// Tool: Buscar Debitos pelo CPF
// ========================================

server.tool(
  "findDebitByCpf",
  "Buscar Debitos pelo CPF",
  {
    cpf: z.string().describe("CPF para buscar débitos (somente números)"),
    page: z.number().optional().default(1).describe("Número da página"),
    limit: z.number().optional().default(10).describe("Quantidade de registros por página"),
  },
  async ({ cpf, page, limit }) => {
    try {
      const url = `${API_BASE_URL}/debitos/cpf/${cpf}?page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, status: response.status, error: errorText }, null, 2) }],
        };
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify({ success: true, ...data }, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: error.message }, null, 2) }],
      };
    }
  }
);

// ========================================
// Tool: Buscar Debitos IPTU pelo CPF
// ========================================

server.tool(
  "findDebitIptuByCpf",
  "Buscar Debitos de IPTU pelo CPF",
  {
    cpf: z.string().describe("CPF para buscar débitos de IPTU (somente números)"),
    page: z.number().optional().default(1).describe("Número da página"),
    limit: z.number().optional().default(10).describe("Quantidade de registros por página"),
  },
  async ({ cpf, page, limit }) => {
    try {
      const url = `${API_BASE_URL}/debitos/iptu/cpf/${cpf}?page=${page}&limit=${limit}`;
      const response = await fetch(url);

      if (!response.ok) {
        const errorText = await response.text();
        return {
          content: [{ type: "text", text: JSON.stringify({ success: false, status: response.status, error: errorText }, null, 2) }],
        };
      }

      const data = await response.json();
      return {
        content: [{ type: "text", text: JSON.stringify({ success: true, ...data }, null, 2) }],
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: JSON.stringify({ success: false, error: error.message }, null, 2) }],
      };
    }
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("MCP Debitos SIGEP rodando via STDIO...");

import { NextResponse } from "next/server";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "@/lib/swagger";

export async function GET() {
  return NextResponse.json(swaggerSpec);
}
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { prisma } from "../../../lib/prisma";

export const runtime = "nodejs";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const items = await prisma.item.findMany({
      where: type ? { type } : undefined,
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(items);
  } catch (err) {
    console.error("GET /api/items error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const type = String(formData.get("type") ?? "");
    const category = String(formData.get("category") ?? "");
    const name = String(formData.get("name") ?? "");
    const price = String(formData.get("price") ?? "");
    const ingredients = String(formData.get("ingredients") ?? "");
    const file = formData.get("image");

    if (!type || !category || !name || !price) {
      return NextResponse.json(
        { error: "type, category, name and price are required" },
        { status: 400 }
      );
    }

    let imagePath = "";
    if (file && file instanceof File && file.size > 0) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadDir, { recursive: true });
      const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
      await writeFile(path.join(uploadDir, fileName), buffer);
      imagePath = `/uploads/${fileName}`;
    }

    const item = await prisma.item.create({
      data: { type, category, name, price, image: imagePath, ingredients: ingredients || null },
    });
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    console.error("POST /api/items error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
import { NextResponse } from "next/server";
// // import prisma from "../../../../prisma";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    return Error("DB接続に失敗しました");
  }
}

export const GET = async (req: Request, res: NextResponse) => {
  try {
    await main();
    const allNaisei = await prisma.post.findMany();
    return NextResponse.json({ message: "Success", allNaisei }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export const POST = async (req: Request, res: NextResponse) => {
//   console.log("POST");

//   try {
//     const { naisei, evaluation_type, createUser_id } = await req.json();
//     await main();
//     const createNaisei = await prisma.naisei.create({ data: { naisei, evaluation_type, createUser_id } });
//     return NextResponse.json({ message: "Success", createNaisei }, { status: 201 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };


// import { NextRequest, NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET() {
//   const allNaisei = await getAllNaisei();
//   return NextResponse.json(allNaisei);
// }

// export async function POST(request: NextRequest) {
//   const { content } = await request.json();

//   await prisma.notes.create({
//     data: {
//       content: content,
//     },
//   });

//   const notes = await getAllNotes();
//   return NextResponse.json(notes);
// }

// export async function DELETE(request: NextRequest) {
//   const id = parseInt(request.nextUrl.searchParams.get('id')!);

//   await prisma.notes.delete({
//     where: {
//       id: id,
//     },
//   });

//   const notes = await getAllNotes();
//   return NextResponse.json(notes);
// }

async function getAllNaisei() {
  const notes = await prisma.naisei.findMany();
  return notes;
}
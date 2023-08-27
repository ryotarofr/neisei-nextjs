import { NextResponse } from "next/server";
// import { main } from "../route";
import prisma from "../../../../prisma";

export const GET = async (req: Request, res: NextResponse) => {
  try {
    const created_at: any = parseInt(req.url.split("/naisei/")[1]);
    // await main();

    const post = await prisma.naisei.findFirst({ where: { created_at } });

    if (!post) {
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    }


    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// export const PUT = async (req: Request, res: NextResponse) => {
//   try {
//     const id: number = parseInt(req.url.split("/blog/")[1]);
//     const { title, description } = await req.json();

//     await main();

//     const post = await prisma.post.update({
//       data: { title, description },
//       where: { id },
//     });

//     return NextResponse.json({ message: "Success", post }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// };

// export const DELETE = async (req: Request, res: NextResponse) => {
//   try {
//     const id: number = parseInt(req.url.split("/blog/")[1]);

//     await main();

//     const post = await prisma.post.delete({
//       where: { id },
//     });

//     return NextResponse.json({ message: "Success", post }, { status: 200 });
//   } catch (err) {
//     return NextResponse.json({ message: "Error", err }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
  // }
// };

import { PrismaClient } from "@prisma/client";

export default async function getPosts(req: any, res: any) {
  const prisma = new PrismaClient();
  const posts = await prisma.post.findMany();
  res.json(posts);
}

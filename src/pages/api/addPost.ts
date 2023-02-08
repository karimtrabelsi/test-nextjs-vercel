import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function addPost(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();
  const { title, body } = req.body;
  const post = await prisma.post.create({
    data: {
      title: title,
      body: body,
    },
  });
  res.json(post);
}

export default addPost;

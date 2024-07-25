import prisma from "../../../lib/prisma";
export default async function addPost(req, res) {
  const { authorId, title, subtitle, content, banner, thumbnail } = req.body; //clue : req.body destruct = auth,title dkk

  try {
    const result = await prisma.blog.create({
      data: {
        author_id: parseInt(authorId),
        title,
        subtitle,
        content,
        banner,
        thumbnail,
      },
    });
    res.status(201).json(result);
  } catch (error) {
    console.log(data.status(500).json({ error: "Internal Server Error" }));
  }
}

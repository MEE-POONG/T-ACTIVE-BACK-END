import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.about.findFirst({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.about.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        title1 : req.body.title1,
                        subtitle1 : req.body.subtitle1,
                        detail1 : req.body.detail1,
                        imagea1 : req.body.imagea1,

                        title2 : req.body.title2,
                        subtitle2 : req.body.subtitle2,
                        detail2 : req.body.detail2,
                        imagea2 : req.body.imagea2,

                        title3 : req.body.title3,
                        subtitle3 : req.body.subtitle3,
                        detail3 : req.body.detail3,
                        imagea3 : req.body.imagea3,
                    }
                })
                prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                console.log(error);
                //  res.status(400).json({ success: false })

            }
            break
        case 'DELETE':
            try {
                await prisma.about.delete({
                    where: {
                        id: req.query.id
                    }
                });
                prisma.$disconnect();
                res.status(204).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}


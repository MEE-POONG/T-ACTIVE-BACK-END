import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.products.findFirst({
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
                await prisma.products.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        header: header,
                        subheader: subheader,

                        title1: req.body.title1,
                        subtitle1: req.body.subtitle1,
                        detail1: req.body.detail1,
                        imagep1: req.body.imagep1,

                        title2: req.body.title2,
                        subtitle2: req.body.subtitle2,
                        detail2: req.body.detail2,
                        imagep2: req.body.imagep2,

                        title3: req.body.title3,
                        subtitle3: req.body.subtitle3,
                        detail3: req.body.detail3,
                        imagep3: req.body.imagep3,
                    }

                })
                prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.products.delete({
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


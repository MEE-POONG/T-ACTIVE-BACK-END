
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.homee.findFirst({
                    where: {
                        id: req.query.id
                    }
                });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'PUT':
            try {
                await prisma.homee.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        title1 : req.body.title1,
                        subtitle1 : req.body.subtitle1,
                        detail1 : req.body.detail1,
                        imageh1 : req.body.imageh1,

                        title2 : req.body.title2,
                        subtitle2 : req.body.subtitle2,
                        detail2 : req.body.detail2,
                        imageh2 : req.body.imageh2,

                        title3 : req.body.title3,
                        subtitle3 : req.body.subtitle3,
                        detail3 : req.body.detail3,
                        imageh3 : req.body.imageh3,
                    }
                })
                // prisma.$disconnect();
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}
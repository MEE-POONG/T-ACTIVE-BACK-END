import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    // console.log("",req.body);
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.products.findMany();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.products.create({
                    data: {
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
                res.status(201).json({ success: true })
            } catch (error) {
                console.log(error);
                // res.status(400).json({ success: false })
            }
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}

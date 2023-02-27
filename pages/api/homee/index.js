import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {

    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.homee.findMany();
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.homee.create({
                    data: {
                        title: req.body.title,
                        detail: req.body.detail,
                        imageh: req.body.imageh,
                    }
                })
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

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.headproduct.findFirst({
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
                await prisma.headproduct.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        title: req.body.title,
                        subtitle: req.body.subtitle,
                        detail: req.body.detail,       
                    }

                })
                
                res.status(201).json({ success: true })
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
        case 'DELETE':
            try {
                await prisma.headproduct.delete({
                    where: {
                        id: req.query.id
                    }
                });
                
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


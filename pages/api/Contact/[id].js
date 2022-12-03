import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.contact.findFirst({
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
                await prisma.contact.update({
                    where: {
                        id: req.query.id
                    },
                    data: {
                        title: req.body.title,
                        address: req.body.address,
                        tel: req.body.tel,
                        line: req.body.line,
                        titleOpenDate: req.body.titleOpenDate,
                        openTime: req.body.openTime,
                       
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
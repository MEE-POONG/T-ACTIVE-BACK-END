import { PrismaClient } from "@prisma/client"
import { TRUE } from "sass"
const prisma = new PrismaClient()

export default async function handler(req, res) {

    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.banks.findMany({ include: { user: true } });
                res.status(200).json(data)
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.banks.create({
                    data: {
                        accountname: parseInt(req.body.accountname),
                        namebank: parseInt(req.body.namebank),
                        numberbank: parseInt(req.body.numberbank),
                        userId: req.body.userId,          
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

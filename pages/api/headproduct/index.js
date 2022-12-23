import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function handler(req, res) {
    // console.log("",req.body);
    const { method } = req
    switch (method) {
        case 'GET':
            try {
                const data = await prisma.headproduct.findMany();
                res.status(200).json(data)
            } catch (error) {
                console.log(error);
                // res.status(400).json({ success: false })
            }
            break
            case 'POST':
            try {
                await prisma.headproduct.create({
                    data: {
                        header: req.body.header,
                        subheader: req.body.subheader,           
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

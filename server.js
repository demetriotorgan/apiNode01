import express from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

const app = express();
app.use(express.json());

//criando a  rota get
app.get('/usuarios', async(req, res)=>{
    let users = [];
    if (req.query){
        users = await prisma.user.findMany({
            where: {
                name: req.query.name,
                age: req.query.age,
                email: req.query.email
            }
        })
    } else{
        users = await prisma.user.findMany();
    }
    res.status(200). json(users);
})

//criando a rota post
app.post('/usuarios', async(req, res)=>{
   await prisma.user.create({
        data:{
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body);
})

//Criando rota PUT
app.put('/usuarios/:id', async(req, res)=>{
    await prisma.User.update({
        where:{
            id: req.params.id
        },
         data:{
             email: req.body.email,
             name: req.body.name,
             age: req.body.age
         }
     })
     res.status(201).json(req.body);
 })

 //Criando Rota DELETE
 app.delete('/usuarios/:id', async(req,res)=>{
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({message: "Usuário deletado com sucesso"});
 })
 
app.listen(3000)

export default app


/*
    Objetivos:
    1- Criar usuário
    2- Listar todos os usuários
    3- Editar um usuário
    4- Deletar um usuário

    senha de usuario do MongoDB -> UE4Rr6dktluIOGMa
*/
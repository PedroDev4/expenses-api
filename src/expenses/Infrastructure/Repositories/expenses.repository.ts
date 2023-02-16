/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";
import { Expense } from "src/expenses/entities/Expenses";
import { IExpensesRepository } from "./interfaces/IExpensesRepository";

export const prisma = new PrismaClient();

@Injectable()
export class ExpensesRepository implements IExpensesRepository {

    async create({ userId,value,expenseDate,description }: Expense): Promise<void> {
        await prisma.expenses.create({
            data: {
                description,
                expenseDate,
                value,
                userId 
            }
        });

    }

    async findAll(userId: string): Promise<Expense[]> {
        const expenses = await prisma.expenses.findMany({
            where: { userId }
        });

        return expenses;
    }
    
    async update({id, description, expenseDate, value}: Expense): Promise<void> {
        await prisma.expenses.update({
            where: { id },
            data: {
                description,
                expenseDate,
                value,      
            }
        })
    }

    async delete(expenseId: string): Promise<void> {
        await prisma.expenses.delete({
            where: { id: expenseId }
        });
    }
}
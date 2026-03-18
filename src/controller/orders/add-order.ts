import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { Food } from "@prisma/client";

type OrderItems = {
  foodId: number;
  quantity: number;
};

type BodyType = {
  userId: number;
  orderItems: OrderItems[];
};

type FoodWithQuantity = Food & { quantity: number };

export const addOrder = async (req: Request, res: Response) => {
  const { userId, orderItems }: BodyType = req.body;

  const totalPrice = await calcTotalPrice(orderItems);

  try {
    const order = await prisma.foodOrder.create({
      data: {
        userId,
        status: "Pending",
        totalPrice: String(totalPrice),
        foodOrderItems: {
          create: orderItems,
        },
      },
    });

    res.json({ order });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid" });
  }
};

const calcTotalPrice = async (orderItems: OrderItems[]): Promise<number> => {
  const foodIds = orderItems.map((item) => item.foodId);
  const foods = await findFoodsById(foodIds);

  const foodWithQuantity: FoodWithQuantity[] = foods.map((food) => {
    const foundedOrderItem = orderItems.find(
      (orderItem) => orderItem.foodId === food.id,
    );
    return { ...food, quantity: foundedOrderItem?.quantity ?? 0 };
  });

  const totalPrice = foodWithQuantity.reduce(
    (acc: number, food: FoodWithQuantity) => {
      return acc + Number(food.price) * food.quantity;
    },
    0,
  );

  return totalPrice;
};

const findFoodsById = async (foodIds: number[]): Promise<Food[]> => {
  return await prisma.food.findMany({
    where: { id: { in: foodIds } },
  });
};

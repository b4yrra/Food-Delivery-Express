import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

type OrderItems = {
  foodId: number;
  quantity: number;
};

type BodyType = {
  userId: number;
  orderItems: OrderItems[];
};

export const addOrder = async (req: Request, res: Response) => {
  const { userId, orderItems }: BodyType = req.body;

  const totalPrice = await calcTotalPrice(orderItems);

  try {
    const order = await prisma.foodOrder.create({
      data: {
        userId,
        status: "Pending",
        totalPrice: totalPrice,
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

const calcTotalPrice = async (orderItems: OrderItems[]) => {
  const foodIds = orderItems.map((item) => item.foodId);

  const foods = await findFoodsById(foodIds);

  const foodWithQuantity = foods.map((food) => {
    const foundedOrderItem = orderItems.find(
      (orderItem) => orderItem.foodId === food.id,
    );

    return { ...food, quantity: foundedOrderItem?.quantity };
  });

  const totalPrice = foodWithQuantity.reduce((a, b) => {
    return a + Number(b.price) * Number(b.quantity);
  }, 0);

  return totalPrice;
};

const findFoodsById = async (foodIds: number[]) => {
  const foods = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
  });

  return foods;
};

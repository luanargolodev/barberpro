import { prismaClient } from "../../prisma";

interface UpdateUserRequest {
  user_id: string;
  name: string;
  address: string;
}

class UpdateUserService {
  async execute({ user_id, name, address }: UpdateUserRequest) {
    try {
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          id: user_id,
        },
      });

      if (!userAlreadyExists) {
        throw new Error("User not found!");
      }

      const userUpdated = await prismaClient.user.update({
        where: {
          id: user_id,
        },
        data: {
          name,
          address,
        },
        select: {
          name: true,
          email: true,
          address: true,
        },
      });

      return userUpdated;
    } catch (err) {
      throw new Error("Error an updating the user!");
    }
  }
}

export { UpdateUserService };

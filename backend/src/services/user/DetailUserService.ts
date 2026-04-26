import { prismaClient } from "../../prisma";

interface UserDetailRequest {
  user_id: string;
}

class UserDetailService {
  async execute({ user_id }: UserDetailRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        subscription: {
          select: {
            id: true,
            price_id: true,
            status: true,
          },
        },
      },
    });

    return user;
  }
}

export { UserDetailService };

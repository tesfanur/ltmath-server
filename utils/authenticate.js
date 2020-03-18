import UserModel from "./../models/UserModel";

const authenticate = async ({ req }) => {
  try {
    // const token = req.headers.authorization;
    const token = req.get("authorization");
    const decoded = await UserModel.verifyAccessToken(token);
    console.log({ tokenFromAuthenticate: token, decoded });

    const user = await UserModel.findOne({ username: decoded.username })
      .lean()
      .select("-password")
      .exec();

    return user;
  } catch (error) {
    return null;
  }
};

export default authenticate;

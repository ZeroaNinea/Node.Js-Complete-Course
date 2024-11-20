import User from "./user.model";

const syncModels = async () => {
  try {
    await User.sync();
    console.log("`User` table and model synced successfully!");
  } catch (err) {
    console.error("Error syncing the `User` table and model:", err);
  }
};

syncModels();

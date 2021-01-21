import { AvatarGenerator } from "random-avatar-generator";

const generator = new AvatarGenerator();

class tipos {
  constructor() {}
  cliente(data, withAvatarUrl = false){
    if (withAvatarUrl) {
      data.avatar = generator.generateRandomAvatar(data.name);
    }
    return {
      id: data.id || data.uid,
      avatar: data.avatar || "",
      name: data.name || "",
      age: parseInt(data.age) || 0,
    };
  }
  producto(data) {
    return {
      id: data.id || data.uid,
      price: data.price || 9999999999,
      name: data.name || "",
    };
  }
  transaccion(data) {
    return {
      id: data.id || data.uid,
      buyer_id: data.buyer_id || data["buyer id"],
      device: data.device || data.devices,
      product_ids: data.product_ids || data["product ids"],
    };
  }
}
export default new tipos();

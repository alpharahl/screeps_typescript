export class RoomUtils {
  public static OwnedByMe(room: Room) {
    if (room.controller) {
      let controller = room.controller;
      if (controller.owner) {
        // Room is owned
        return controller.owner.username == "alpha-rahl";
      } else if (controller.reservation) {
        // Room is reserved
        return controller.reservation.username == "alpha-rahl";
      }
    }
    return false;
  }
}

class Building {
  constructor(name, floors, roomsPerFloor) {
    this.name = name;
    this.floors = floors;
    this.roomsPerFloor = roomsPerFloor;
  }
  createRooms = (floor) => {
    const rooms = [];
    for (let i = (floor - 1) * this.roomsPerFloor + 1; i < this.roomsPerFloor * floor; i++) rooms.push[i];
    return rooms;
  };
  createFloors = () => {
    const floors = [];
    for (let i = 1; i < this.floors + 1; i++) floors.push[i];
    return floors;
  };
}
export default Building;

const northBuilding = new Building('North Building', 5, 7);
const southBuilding = new Building('South Building', 2, 4);
const westBuilding = new Building('West Building', 7, 3);
const eastBuilding = new Building('East Building', 4, 8);

export const buildings = [northBuilding, southBuilding, westBuilding, eastBuilding];

export const buildingsNames = buildings.map((el) => el.name);

import { BASE_POSITIONS, initalPos } from "../../utils/ludo/constants";

export class Positions {
  [P1: string]: number[];
  P2: number[];
  P3: number[];
  P4: number[];
  constructor() {
    this.P1 = new Array(...BASE_POSITIONS.P1);
    this.P2 = new Array(...BASE_POSITIONS.P2);
    this.P3 = new Array(...BASE_POSITIONS.P3);
    this.P4 = new Array(...BASE_POSITIONS.P4);
  }
}
export class PositionMaping {
  [P1: string]: {
    [key: number]: {
      class: string;
      top: string;
      left: string;
    };
  };
  P2: {
    [key: number]: {
      class: string;
      top: string;
      left: string;
    };
  };
  P3: {
    [key: number]: {
      class: string;
      top: string;
      left: string;
    };
  };
  P4: {
    [key: number]: {
      class: string;
      top: string;
      left: string;
    };
  };

  constructor() {
    this.P1 = initalPos.player1;
    this.P2 = initalPos.player2;
    this.P3 = initalPos.player3;
    this.P4 = initalPos.player4;
  }
}


export class Spots {
  [P1: string]: {
    [key: number]: number
  };
  P2: {
    [key: number]: number
  };

  constructor() {
    this.P1 = {
      0: 500,
      1: 501,
      2: 502,
      3: 503

    }
    this.P2 = {
      0: 600,
      1: 601,
      2: 602,
      3: 603

    }

  }
  // constructor() {
  //   this.P1 = initalPos.player1;
  //   this.P2 = initalPos.player2;

  // }
}
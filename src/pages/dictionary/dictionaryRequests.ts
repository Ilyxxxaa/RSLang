export class Server {
  words: string;
  serverAdress: string;

  constructor() {
    this.serverAdress = 'https://serverforrslang.herokuapp.com';
    this.words = `${this.serverAdress}/words`;
  }

  public async getWords(group: number, page: number) {
    const response = await fetch(`${this.words}/?group=${group}&page=${page}`);
    const words = await response.json();
    return words;
  }
}




// class Server {
//   public async getCars(page: number, limit = 7) {
//     const response = await fetch(`${garage}/?_page=${page}&_limit=${limit}`);
//     const items = await response.json();
//     return {
//       items,
//       count: Number(response.headers.get('X-Total-Count')),
//     };
//   }

//   public async getCar(id: number) {
//     return (await fetch(`${garage}/${id}`)).json();
//   }

//   public async createCar(body: Car) {
//     return (
//       await fetch(garage, {
//         method: 'POST',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify(body),
//       })
//     ).json();
//   }

//   public async deleteCar(id: number) {
//     return (await fetch(`${garage}/${id}`, { method: 'DELETE' })).json();
//   }

//   public async updateCar(id: number, body: Car) {
//     return (
//       await fetch(`${garage}/${id}`, {
//         method: 'PUT',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify(body),
//       })
//     ).json();
//   }

//   // public async startEngine(id: number) {
//   //     return (await fetch(`${engine}/?id=${id}&status=started`)).json();
//   // }

//   public async startEngine(id: number) {
//     return (
//       await fetch(`${engine}/?id=${id}&status=started`, {
//         method: 'PATCH',
//       })
//     ).json();
//   }

//   public async stopEngine(id: number) {
//     return (
//       await fetch(`${engine}/?id=${id}&status=stopped`, {
//         method: 'PATCH',
//       })
//     ).json();
//   }

//   public async switchEngine(id: number) {
//     const res = await fetch(`${engine}/?id=${id}&status=drive`).catch();
//     return res.status !== 200 ? { success: false } : { ...(await res.json()) };
//   }

//   public async getWinners({ page, limit = 7, sort = 'id', order = 'ASC' }: Winners) {
//     const response = await fetch(`${winners}?page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`);
//     const items = await response.json();
//     return {
//       items: await Promise.all(
//         items.map(async (winner: Winner) => ({ ...winner, car: await this.getCar(winner.id) }))
//       ),
//       count: Number(response.headers.get('X-Total-Count')),
//     };
//   }

//   public async getWinner(id: number) {
//     return (await fetch(`${winners}/${id}`)).json();
//   }

//   public async getWinnerStatus(id: number) {
//     return (await fetch(`${winners}/${id}`)).status;
//   }

//   public async deleteWinner(id: number) {
//     return (await fetch(`${winners}/${id}`, { method: 'DELETE' })).json();
//   }

//   public async createWinner(body: Winner) {
//     return (
//       await fetch(winners, {
//         method: 'POST',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify(body),
//       })
//     ).json();
//   }

//   public async updateWinner(id: number, body: Winner) {
//     return (
//       await fetch(`{${winners}/${id}}`, {
//         method: 'PUT',
//         headers: { 'Content-type': 'application/json' },
//         body: JSON.stringify(body),
//       })
//     ).json();
//   }
// }

// export default Server;
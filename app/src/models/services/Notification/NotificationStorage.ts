import mariadb from "../../../config/mariadb";

interface request {
  notiCategoryNum?: number;
  senderNickname?: string;
  recipientNickname?: string;
  url?: string;
}

interface response {
  success: boolean;
}

interface notification {
  senderNickname: string;
  notiCategoryNum: number;
  inDate: string;
  boardTitle: string;
  readFlag: number;
}

class NotificationStorage {
  static async create(boardNum: number, req: request, purchaseBoardNum?: number): Promise<response> {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const notification = await conn.query(
        `INSERT INTO notifications (board_no, noti_category_no, sender_nickname, recipient_nickname, email, url) 
        VALUES (?, ?, ?, ?, (SELECT email FROM students WHERE nickname = '${req.recipientNickname}'), ?);`,
        [
          boardNum ? boardNum : purchaseBoardNum,
          req.notiCategoryNum,
          req.senderNickname,
          req.recipientNickname,
          req.url
        ]
      );

      if (notification.affetedRows) {
        return { success: true }
      }
      return { success : false };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }

  static async findOneByNickname(req: request): Promise<string> {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const response = await conn.query(
        `SELECT email FROM students WHERE nickname = ?;`,
        [
          req.recipientNickname,
        ]
      );

      return response[0].email;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    } 
  }

  static async findOneByBoardNum(boardNum: number) : Promise<string> {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const response = await conn.query(
        `SELECT title FROM boards WHERE no = ?`,
        [
          boardNum
        ]
      )

      return response[0].title;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}


export default NotificationStorage;
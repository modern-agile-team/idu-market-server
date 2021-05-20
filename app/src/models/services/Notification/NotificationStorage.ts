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

  static async findAllbyNickname(req: request): Promise<notification[]> {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const notifications = await conn.query(
        `SELECT no.sender_nickname AS senderNickname, no.noti_category_no AS notiCategoryNum, bo.title AS boardTitle, no.read_flag AS readFlag,
        date_format(no.in_date, '%Y-%m-%d %H:%i:%s') AS inDate 
        FROM notifications no
        JOIN boards bo
        ON bo.no = no.board_no
        WHERE recipient_nickname = ?;`,
        [
          req.recipientNickname,
        ]
      );

      const notification: notification[] = Object.values(JSON.parse(JSON.stringify(notifications)));
      return notification;
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}


export default NotificationStorage;
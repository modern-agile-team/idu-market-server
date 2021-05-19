import { bool } from "aws-sdk/clients/signer";
import mariadb from "../../../config/mariadb";

interface request {
  num?: number;
  senderNickname?: string;
  recipientNickname?: string;
  url?: string;
}

interface response {
  success: boolean;
  num?: number;
}
class NotificationStorage {
  static async create(boardNum: number, req: request): Promise<response> {
    let conn;

    try {
      conn = await mariadb.getConnection();

      const notification = await conn.query(
        `INSERT INTO notifications (board_no, noti_category_no, sender_nickname, recipient_nickname, email, url) 
        VALUES (?, ?, ?, ?, (SELECT email FROM students WHERE nickname = '${req.recipientNickname}'), ?);`,
        [
          boardNum,
          req.num,
          req.senderNickname,
          req.recipientNickname,
          req.url
        ]
      );

      if (notification.insertId) {
        return { success: true, num: notification.insertId }
      }
      return { success : false };
    } catch (err) {
      throw err;
    } finally {
      conn?.release();
    }
  }
}


export default NotificationStorage;
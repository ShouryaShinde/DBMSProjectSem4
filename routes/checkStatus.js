import express from "express" ;
import db from "../db/database.js" ;

const router = express.Router() ;

router.get("/" , async (req , res) => {
  res.render("checkStatusForm") ;
});

router.post("/" , async (req,res) => {
  const { plateNo } = req.body ;

  const result = await db.query(`
    SELECT 
        b.booking_id,
        v.license_plate,
        b.service_type,
        b.status,
        b.expected_return_date,
        b.created_at
      FROM vehicles v
      JOIN bookings b ON v.vid = b.vid
      WHERE v.license_plate = $1
      ORDER BY b.created_at DESC`,
      [plateNo.toUpperCase()] 
    );
    res.render("status", { bookings: result.rows });
});

export default router ;
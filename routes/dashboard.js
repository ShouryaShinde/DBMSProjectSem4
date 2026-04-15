import express from "express" ;
import db from "../db/database.js" ;

const router = express.Router() ;

router.get("/" , async(req ,res) => {
  try{
    const bayStats = await db.query(`
      SELECT 
        COUNT(*) AS total_bays,
        COUNT(*) FILTER (WHERE status = 'Free') AS free_bays,
        COUNT(*) FILTER (WHERE status = 'Occupied') AS occupied_bays,
        COUNT(*) FILTER (WHERE status = 'Maintenance') AS maintenance_bays
      FROM service_bays
    `);
    const bookingStats = await db.query(`
      SELECT 
        COUNT(*) AS total_requests,
        COUNT(*) FILTER (WHERE status = 'Pending') AS pending,
        COUNT(*) FILTER (WHERE status = 'In Progress') AS in_progress,
        COUNT(*) FILTER (WHERE status = 'Completed') AS completed
      FROM bookings
    `);
    const mechStats = await db.query(`
      SELECT COUNT(*) AS total_mechanics FROM mechanics
    `);

    const upcomingResult = await db.query(`
      SELECT 
        b.booking_id,
        v.license_plate,
        b.service_type,
        b.status,
        b.expected_return_date
      FROM bookings b
      JOIN vehicles v ON b.vid = v.vid
      WHERE b.status IN ('Pending', 'In Progress')
      ORDER BY b.expected_return_date ASC
    `);

    res.render("dashboard", {
      bays: bayStats.rows[0],
      bookings: bookingStats.rows[0],
      mechanics: mechStats.rows[0],
      upcoming: upcomingResult.rows
    });
  } catch (err) {
    console.log(err) ;
  }
});

export default router ;
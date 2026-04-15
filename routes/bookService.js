import express from "express" ;
import db from "../db/database.js" ;

const router = express.Router() ;

router.get("/" , async(req , res) => {
  res.render("bookingform") ;
})

router.post("/" , async(req,res) => {
  try {
    // INSERT on users table
    const { firstName, lastName, phone, email } = req.body;
    const userResult = await db.query(
      `UPDATE users SET first_name = $1, last_name = $2, phone = $3 WHERE email = $4 RETURNING user_id`,
      [firstName, lastName, phone, email],
    );
    const userid = userResult.rows[0].user_id;
    const { plateNo, vehicleType, weightClass } = req.body;

    // INSERT on Vehicles table
    const vehicleResult = await db.query(
      `INSERT INTO vehicles(user_id , vehicle_type , weight_class , license_plate) VALUES ($1 , $2 , $3 , $4) RETURNING vid`,
      [userid, vehicleType, weightClass, plateNo],
    );
    const vehicleid = vehicleResult.rows[0].vid;

    // INSERT into bookings
    const { serviceType, urgency, description, address, returnDate } = req.body;

    const pickup = !!req.body.pickup;

    // normalize values
    const desc = description || null;
    const addr = pickup ? address || null : null;
    const urg = urgency || null;

    await db.query(
      `INSERT INTO bookings
    (user_id, vid, service_type, description, expected_return_date, urgency, pickup_required, address)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
      [userid, vehicleid, serviceType, desc, returnDate, urg, pickup, addr],
    );

    res.redirect("/home") ;
  } catch (err) {
    console.log(err) ;
  }
});

export default router ;
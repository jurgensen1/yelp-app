require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./db");

const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

// Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
    console.log("Get all restaurants");
    try {
        // const results = await db.query("select * from restaurants");
        const restaurantRatingData = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id;"
         );

res.status(200).json({
    status: "success",
    results: restaurantRatingData.rows.length,
    data: {
        restaurants: restaurantRatingData.rows,
    }
});
    } catch (err) {
    console.log(err);
}
});
// Get a Restaurant at restaurants/
// app.get("/restaurants/api/v1/restaurants/:id", async (req, res) => {
//     console.log("Get a restaurant:");
//     console.log("req.params.id: " + req.params.id);

//     try {
//         const restaurant = await db.query(
//             "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",
//             [req.params.id]
//         );
//         const reviews = await db.query(
//             "select * from reviews where restaurant_id = $1;",
//              [req.params.id]
//         );
//         // console.log(reviews);
        

//         res.status(200).json({
//             status: "success",
//             data: {
//                 restaurant: restaurant.rows[0],
//                 reviews: reviews.rows,
//             },
//         });
//     } catch (err) {
//         console.log("error2");

//         console.log(err);
//     }
// });
// Get a Restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log("Get a restaurant:");
    console.log("req.params.id: " + req.params.id);

    try {
        const restaurant = await db.query(
            "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",
            [req.params.id]
        );
        const reviews = await db.query(
            "select * from reviews where restaurant_id = $1;",
             [req.params.id]
        );
        console.log(reviews);
        

        res.status(200).json({
            status: "success",
            data: {
                restaurant: restaurant.rows[0],
                reviews: reviews.rows,
            },
        });
    } catch (err) {
        console.log("error1");
        console.log(err);
    }
});

// app.get("/restaurants/:id/api/v1/restaurants/:id", async (req, res) => {
//     console.log("req.params.id: " + req.params.id);

//     try {
//         const restaurant = await db.query(
//             "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id where id = $1;",
//             [req.params.id]
//         );
//         const reviews = await db.query(
//             "select * from reviews where restaurant_id = $1;",
//              [req.params.id]
//         );
//         // console.log(reviews);
        

//         res.status(200).json({
//             status: "success",
//             data: {
//                 restaurant: restaurant.rows[0],
//                 reviews: reviews.rows,
//             },
//         });
//     } catch (err) {
//         console.log("error3");

//         console.log(err);
//     }
// });

// Create a Restaurant
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);
    try {
        const results = await db.query(
            "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *;",
            [req.body.name, req.body.location, req.body.price_range]
        );
        console.log(results)
        res.status(201).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});


// Update a Restaurant 
app.put("/api/v1/restaurants/:id", async (req, res) => {
    // console.log(req.body);
    try {
        const results = await db.query(
            "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;",
            [req.body.name, req.body.location, req.body.price_range, req.params.id],
        );
        // console.log(results);
        res.status(200).json({
            status: "success",
            data: {
                restaurant: results.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});
// Update a Restaurant 
// app.put("/restaurants/api/v1/restaurants/:id", async (req, res) => {
//     // console.log(req.body);
//     try {
//         const results = await db.query(
//             "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;",
//             [req.body.name, req.body.location, req.body.price_range, req.params.id],
//         );
//         // console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 restaurant: results.rows[0],
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });
// app.put("/restaurants/:id/api/v1/restaurants/:id", async (req, res) => {
//     // console.log(req.body);
//     try {
//         const results = await db.query(
//             "UPDATE restaurants SET name = $1, location = $2, price_range = $3 where id = $4 returning *;",
//             [req.body.name, req.body.location, req.body.price_range, req.params.id],
//         );
//         // console.log(results);
//         res.status(200).json({
//             status: "success",
//             data: {
//                 restaurant: results.rows[0],
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

// Delete Restaurants
app.delete("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.body);
    try {
        const reviews = await db.query(
            "DELETE FROM reviews where restaurant_id = $1;",
            [req.params.id],
        );
        const restaurants = await db.query(
            "DELETE FROM restaurants where id = $1;",
            [req.params.id],
        );
        res.status(204).json({
            status: "success",
            // data: {
            //     restaurant: results.rows[0],
            // }
        });
    } catch (err) {
        console.log(err);
    }
});
// Post a New Review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
    console.log(req.body);
    try {
        const newReview = await db.query(
            "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
            [req.params.id, req.body.name, req.body.review, req.body.rating]
        );
        console.log(newReview);
        res.status(201).json({
            status: "success",
            data: {
                restaurant: newReview.rows[0],
            }
        });
    } catch (err) {
        console.log(err);
    }
});
// app.post("/restaurants/api/v1/restaurants/:id/addReview", async (req, res) => {
//     console.log(req.body);
//     try {
//         const newReview = await db.query(
//             "INSERT INTO reviews (restaurant_id, name, review, rating) values ($1, $2, $3, $4) returning *;",
//             [req.params.id, req.body.name, req.body.review, req.body.rating]
//         );
//         console.log(newReview);
//         res.status(201).json({
//             status: "success",
//             data: {
//                 restaurant: newReview.rows[0],
//             }
//         });
//     } catch (err) {
//         console.log(err);
//     }
// });

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});